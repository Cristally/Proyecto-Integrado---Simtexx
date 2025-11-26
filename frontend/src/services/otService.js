// services/otService.js

const KEY = "ot_list";

export function getOTs() {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export function getOTById(id) {
  return getOTs().find((ot) => ot.id === id);
}

export function createOT(ot) {
  const list = getOTs();
  list.push(ot);
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function updateOT(id, data) {
  const ots = getOTs();
  const index = ots.findIndex(o => o.id === id);

  if (index !== -1) {
    ots[index] = { ...ots[index], ...data };
    localStorage.setItem(KEY, JSON.stringify(ots));
  }
}

export function saveOTs(ots) {
  localStorage.setItem(KEY, JSON.stringify(ots));
}

export function deleteOT(id) {
  const ots = getOTs();
  const nuevas = ots.filter(ot => ot.id !== id);
  saveOTs(nuevas);
}
