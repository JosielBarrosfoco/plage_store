# 📋 Configuração DNS - Vercel + Hostinger

## 🎯 Configuração Ideal para Tempo Real

### **PASSO 1: Configuração no Vercel**

No painel do Vercel (Settings → Domains), configure:

#### **Domínio Principal: `plagestore.com.br`**
- ✅ **Tipo:** Connect to an environment
- ✅ **Environment:** Production
- ✅ **Status:** Valid Configuration

#### **Domínio WWW: `www.plagestore.com.br`**
- ✅ **Tipo:** Redirect to Another Domain
- ✅ **Redirect para:** `plagestore.com.br`
- ✅ **Tipo de Redirect:** 307 Temporary Redirect (ou 308 Permanent Redirect)

---

### **PASSO 2: Configuração DNS na Hostinger**

Acesse o painel da Hostinger → **DNS / Nameservers** e configure os seguintes registros:

#### **Registros DNS Necessários:**

| Tipo | Nome | Valor | TTL |
|------|------|-------|-----|
| **A** | `@` | `76.76.21.21` | 3600 (ou Auto) |
| **CNAME** | `www` | `cname.vercel-dns.com.` | 3600 (ou Auto) |

**OU (Método Alternativo - Recomendado):**

| Tipo | Nome | Valor | TTL |
|------|------|-------|-----|
| **CNAME** | `@` | `cname.vercel-dns.com.` | 3600 (ou Auto) |
| **CNAME** | `www` | `cname.vercel-dns.com.` | 3600 (ou Auto) |

> ⚠️ **Nota:** Alguns provedores DNS não permitem CNAME na raiz (@). Se a Hostinger não permitir, use o registro A acima.

---

### **PASSO 3: Verificar no Vercel**

1. No Vercel, vá em **Settings → Domains**
2. Clique em **"View DNS Records & More for plagestore.com.br"**
3. Verifique os valores exatos que o Vercel fornece
4. Use esses valores na Hostinger

---

### **PASSO 4: Configurações Avançadas no Vercel**

#### **Settings → General:**
- ✅ **Framework Preset:** Vite
- ✅ **Build Command:** `npm run build`
- ✅ **Output Directory:** `dist`
- ✅ **Install Command:** `npm install`
- ✅ **Node.js Version:** 18.x ou 20.x

#### **Settings → Git:**
- ✅ **Production Branch:** `main`
- ✅ **Auto-deploy:** Habilitado
- ✅ **Deploy Hooks:** Configurado para push no GitHub

---

### **PASSO 5: Verificar Deploy Automático**

Para garantir atualizações em tempo real:

1. **Settings → Git → Production Branch:** `main`
2. **Settings → Git → Auto-deploy:** ✅ Habilitado
3. Toda vez que você fizer `git push`, o Vercel fará deploy automaticamente

---

## 🔄 Como Funciona o Tempo Real

1. **Você faz commit e push no GitHub**
2. **Vercel detecta automaticamente** (via webhook)
3. **Vercel faz build** do projeto
4. **Vercel faz deploy** para produção
5. **DNS aponta para o Vercel** (através da Hostinger)
6. **Site atualizado em tempo real** (geralmente 1-3 minutos)

---

## ✅ Checklist Final

- [ ] Domínios configurados no Vercel
- [ ] Registros DNS configurados na Hostinger
- [ ] Auto-deploy habilitado no Vercel
- [ ] Branch `main` configurado como produção
- [ ] Verificar status "Valid Configuration" no Vercel
- [ ] Aguardar propagação DNS (até 48h, geralmente 1-2h)

---

## 🚨 Troubleshooting

### **Site não atualiza:**
1. Verifique se o deploy foi concluído no Vercel
2. Limpe o cache do navegador (Ctrl + Shift + Delete)
3. Verifique os logs do deployment no Vercel

### **DNS não resolve:**
1. Aguarde até 48h para propagação completa
2. Use ferramentas como `nslookup` ou `dig` para verificar
3. Verifique se os registros DNS estão corretos na Hostinger

### **Erro de build:**
1. Verifique os logs no Vercel (Deployments → Logs)
2. Teste localmente: `npm run build`
3. Verifique se todas as dependências estão no `package.json`

---

## 📞 Suporte

- **Vercel Docs:** https://vercel.com/docs
- **Hostinger DNS:** https://www.hostinger.com.br/tutoriais/como-configurar-dns

