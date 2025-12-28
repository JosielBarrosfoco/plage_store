import { Hono } from "hono";
import {
  exchangeCodeForSessionToken,
  getOAuthRedirectUrl,
  authMiddleware,
  deleteSession,
  MOCHA_SESSION_TOKEN_COOKIE_NAME,
} from "@getmocha/users-service/backend";
import { getCookie, setCookie } from "hono/cookie";

const app = new Hono<{ Bindings: Env }>();

// Authentication endpoints
app.get("/api/oauth/google/redirect_url", async (c) => {
  const redirectUrl = await getOAuthRedirectUrl("google", {
    apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
    apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
  });

  return c.json({ redirectUrl }, 200);
});

app.post("/api/sessions", async (c) => {
  const body = await c.req.json();

  if (!body.code) {
    return c.json({ error: "No authorization code provided" }, 400);
  }

  const sessionToken = await exchangeCodeForSessionToken(body.code, {
    apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
    apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
  });

  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: true,
    maxAge: 60 * 24 * 60 * 60,
  });

  return c.json({ success: true }, 200);
});

app.get("/api/users/me", authMiddleware, async (c) => {
  return c.json(c.get("user"));
});

app.get("/api/logout", async (c) => {
  const sessionToken = getCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME);

  if (typeof sessionToken === "string") {
    await deleteSession(sessionToken, {
      apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
      apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
    });
  }

  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, "", {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: true,
    maxAge: 0,
  });

  return c.json({ success: true }, 200);
});

// Categories endpoints
app.get("/api/categories", authMiddleware, async (c) => {
  const user = c.get("user");
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM categories WHERE user_id = ? OR user_id = 'default' ORDER BY name ASC"
  )
    .bind(user.id)
    .all();

  return c.json(results);
});

app.post("/api/categories", authMiddleware, async (c) => {
  const user = c.get("user");
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  
  const body = await c.req.json();

  const { success } = await c.env.DB.prepare(
    "INSERT INTO categories (user_id, name, type) VALUES (?, ?, ?)"
  )
    .bind(user.id, body.name, body.type)
    .run();

  if (success) {
    return c.json({ success: true }, 201);
  }

  return c.json({ error: "Failed to create category" }, 500);
});

// Income endpoints
app.get("/api/income", authMiddleware, async (c) => {
  const user = c.get("user");
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM income WHERE user_id = ? ORDER BY date DESC"
  )
    .bind(user.id)
    .all();

  return c.json(results);
});

app.post("/api/income", authMiddleware, async (c) => {
  const user = c.get("user");
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  
  const body = await c.req.json();

  const { success } = await c.env.DB.prepare(
    "INSERT INTO income (user_id, date, type, value, description) VALUES (?, ?, ?, ?, ?)"
  )
    .bind(user.id, body.date, body.type, body.value, body.description)
    .run();

  if (success) {
    return c.json({ success: true }, 201);
  }

  return c.json({ error: "Failed to create income" }, 500);
});

// Expenses endpoints
app.get("/api/expenses", authMiddleware, async (c) => {
  const user = c.get("user");
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM expenses WHERE user_id = ? ORDER BY date DESC"
  )
    .bind(user.id)
    .all();

  return c.json(results);
});

app.post("/api/expenses", authMiddleware, async (c) => {
  const user = c.get("user");
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  
  const body = await c.req.json();

  const { success } = await c.env.DB.prepare(
    "INSERT INTO expenses (user_id, date, category_id, value, description) VALUES (?, ?, ?, ?, ?)"
  )
    .bind(user.id, body.date, body.category_id, body.value, body.description)
    .run();

  if (success) {
    return c.json({ success: true }, 201);
  }

  return c.json({ error: "Failed to create expense" }, 500);
});

// Dashboard summary endpoint
app.get("/api/dashboard/summary", authMiddleware, async (c) => {
  const user = c.get("user");
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  
  const month = c.req.query("month");
  const year = c.req.query("year");
  
  if (!month || !year) {
    return c.json({ error: "Month and year are required" }, 400);
  }
  
  const startDate = `${year}-${month.padStart(2, '0')}-01`;
  const endDate = month === '12' 
    ? `${parseInt(year) + 1}-01-01`
    : `${year}-${(parseInt(month) + 1).toString().padStart(2, '0')}-01`;

  // Get total income
  const incomeResult = await c.env.DB.prepare(
    "SELECT COALESCE(SUM(value), 0) as total FROM income WHERE user_id = ? AND date >= ? AND date < ?"
  )
    .bind(user.id, startDate, endDate)
    .first();

  // Get total expenses
  const expensesResult = await c.env.DB.prepare(
    "SELECT COALESCE(SUM(value), 0) as total FROM expenses WHERE user_id = ? AND date >= ? AND date < ?"
  )
    .bind(user.id, startDate, endDate)
    .first();

  // Get expenses by category
  const { results: expensesByCategory } = await c.env.DB.prepare(
    `SELECT c.name, COALESCE(SUM(e.value), 0) as total 
     FROM categories c
     LEFT JOIN expenses e ON c.id = e.category_id AND e.user_id = ? AND e.date >= ? AND e.date < ?
     WHERE (c.user_id = ? OR c.user_id = 'default') AND c.type = 'despesa'
     GROUP BY c.id, c.name
     HAVING total > 0`
  )
    .bind(user.id, startDate, endDate, user.id)
    .all();

  const totalIncome = incomeResult ? (incomeResult.total as number) : 0;
  const totalExpenses = expensesResult ? (expensesResult.total as number) : 0;

  return c.json({
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses,
    expensesByCategory,
  });
});

// Annual report endpoint
app.get("/api/reports/annual", authMiddleware, async (c) => {
  const user = c.get("user");
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  
  const year = c.req.query("year") || new Date().getFullYear().toString();
  
  const monthlyData = [];
  
  for (let month = 1; month <= 12; month++) {
    const startDate = `${year}-${month.toString().padStart(2, '0')}-01`;
    const endDate = month === 12 
      ? `${parseInt(year) + 1}-01-01`
      : `${year}-${(month + 1).toString().padStart(2, '0')}-01`;

    const incomeResult = await c.env.DB.prepare(
      "SELECT COALESCE(SUM(value), 0) as total FROM income WHERE user_id = ? AND date >= ? AND date < ?"
    )
      .bind(user.id, startDate, endDate)
      .first();

    const expensesResult = await c.env.DB.prepare(
      "SELECT COALESCE(SUM(value), 0) as total FROM expenses WHERE user_id = ? AND date >= ? AND date < ?"
    )
      .bind(user.id, startDate, endDate)
      .first();

    const income = incomeResult ? (incomeResult.total as number) : 0;
    const expenses = expensesResult ? (expensesResult.total as number) : 0;

    monthlyData.push({
      month,
      income,
      expenses,
      balance: income - expenses,
    });
  }

  return c.json(monthlyData);
});

// Export data endpoint
app.get("/api/export", authMiddleware, async (c) => {
  const user = c.get("user");
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  // Get all user data
  const { results: categories } = await c.env.DB.prepare(
    "SELECT * FROM categories WHERE user_id = ? ORDER BY name ASC"
  )
    .bind(user.id)
    .all();

  const { results: income } = await c.env.DB.prepare(
    "SELECT * FROM income WHERE user_id = ? ORDER BY date DESC"
  )
    .bind(user.id)
    .all();

  const { results: expenses } = await c.env.DB.prepare(
    "SELECT * FROM expenses WHERE user_id = ? ORDER BY date DESC"
  )
    .bind(user.id)
    .all();

  return c.json({
    version: "1.0",
    exportDate: new Date().toISOString(),
    data: {
      categories,
      income,
      expenses,
    },
  });
});

// Import data endpoint
app.post("/api/import", authMiddleware, async (c) => {
  const user = c.get("user");
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const body = await c.req.json();
  
  if (!body.data) {
    return c.json({ error: "Invalid import format" }, 400);
  }

  let importedCategories = 0;
  let importedIncome = 0;
  let importedExpenses = 0;

  try {
    // Import categories
    if (body.data.categories && Array.isArray(body.data.categories)) {
      for (const category of body.data.categories) {
        // Check if category already exists
        const existing = await c.env.DB.prepare(
          "SELECT id FROM categories WHERE user_id = ? AND name = ? AND type = ?"
        )
          .bind(user.id, category.name, category.type)
          .first();

        if (!existing) {
          await c.env.DB.prepare(
            "INSERT INTO categories (user_id, name, type) VALUES (?, ?, ?)"
          )
            .bind(user.id, category.name, category.type)
            .run();
          importedCategories++;
        }
      }
    }

    // Import income
    if (body.data.income && Array.isArray(body.data.income)) {
      for (const item of body.data.income) {
        await c.env.DB.prepare(
          "INSERT INTO income (user_id, date, type, value, description) VALUES (?, ?, ?, ?, ?)"
        )
          .bind(user.id, item.date, item.type, item.value, item.description)
          .run();
        importedIncome++;
      }
    }

    // Import expenses - need to map category names to IDs
    if (body.data.expenses && Array.isArray(body.data.expenses)) {
      for (const item of body.data.expenses) {
        let categoryId = item.category_id;
        
        // If the expense has a category_id, we need to find the corresponding category in the current database
        if (categoryId) {
          // Get the original category name from the import data
          const originalCategory = body.data.categories?.find((c: any) => c.id === categoryId);
          
          if (originalCategory) {
            // Find the matching category in the current database
            const currentCategory = await c.env.DB.prepare(
              "SELECT id FROM categories WHERE user_id = ? AND name = ? AND type = 'despesa'"
            )
              .bind(user.id, originalCategory.name)
              .first();
            
            categoryId = currentCategory ? currentCategory.id : null;
          } else {
            categoryId = null;
          }
        }

        await c.env.DB.prepare(
          "INSERT INTO expenses (user_id, date, category_id, value, description) VALUES (?, ?, ?, ?, ?)"
        )
          .bind(user.id, item.date, categoryId, item.value, item.description)
          .run();
        importedExpenses++;
      }
    }

    return c.json({
      success: true,
      imported: {
        categories: importedCategories,
        income: importedIncome,
        expenses: importedExpenses,
      },
    });
  } catch (error) {
    console.error("Import error:", error);
    return c.json({ error: "Failed to import data" }, 500);
  }
});

export default app;
