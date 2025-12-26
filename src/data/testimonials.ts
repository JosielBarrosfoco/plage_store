export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Carlos Mendes",
    role: "CEO, TechStart",
    content: "A planilha de gestão financeira transformou nosso controle de caixa. Economizamos horas por semana e ganhamos visibilidade total das finanças.",
    rating: 5,
  },
  {
    id: "2",
    name: "Ana Beatriz",
    role: "Diretora Comercial",
    content: "O dashboard de vendas no Power BI nos deu insights que nunca tínhamos. Identificamos padrões e aumentamos as vendas em 30%.",
    rating: 5,
  },
  {
    id: "3",
    name: "Roberto Silva",
    role: "Empreendedor Digital",
    content: "Comprei o site institucional e fiquei impressionado com a qualidade. Código limpo, design profissional e fácil de personalizar.",
    rating: 5,
  },
  {
    id: "4",
    name: "Mariana Costa",
    role: "Gerente de Operações",
    content: "A automação de WhatsApp revolucionou nosso atendimento. Respondemos 3x mais rápido e não perdemos mais nenhum lead.",
    rating: 5,
  },
  {
    id: "5",
    name: "Fernando Alves",
    role: "Analista de BI",
    content: "Profissionalismo de alto nível. Os produtos PLAGE economizam semanas de desenvolvimento. Recomendo fortemente.",
    rating: 5,
  },
  {
    id: "6",
    name: "Juliana Rocha",
    role: "Proprietária, Studio JR",
    content: "O tema WordPress é simplesmente perfeito. Meu site ficou profissional em um dia e os clientes adoraram.",
    rating: 5,
  },
];
