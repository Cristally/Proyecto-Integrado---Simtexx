const KEY = "OT_DATA";

export function getOTs() {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export function saveOTs(ots) {
  localStorage.setItem(KEY, JSON.stringify(ots));
}
