export const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 11);
    if (cleaned.length <= 10) {
      return cleaned
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    } else {
      return cleaned
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }
  };
 export const formatCPF = (value) =>
    value
      .replace(/\D/g, "") // só dígitos
      .replace(/(\d{3})(\d)/, "$1.$2") // 123.456
      .replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3") // 123.456.789
      .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4") // 123.456.789-00
      .slice(0, 14);

export  const formatCEP = (value = "") => {
    return value
      .replace(/\D/g, "") // Remove tudo que não for número
      .slice(0, 8) // Limita a 8 dígitos
      .replace(/^(\d{5})(\d)/, "$1-$2"); // Insere o hífen entre o 5º e 6º dígito
  };

export  const formatN = (value) => {
    return value
      .replace(/\D/g, "") // Remove tudo que não for número
      .slice(0, 4) // Limita a 8 dígitos
  };