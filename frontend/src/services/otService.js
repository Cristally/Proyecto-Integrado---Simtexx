import { getOTs, saveOTs } from "./localStorageService";

export function getAllOTs() {
  return getOTs().filter(ot => ot.activa !== false);
}

export function getInactiveOTs() {
  return getOTs().filter(ot => ot.activa === false);
}

export function getOTById(id) {
  return getOTs().find(ot => ot.id === id);
}

export function createOT(newOT) {
  const ots = getOTs();
  ots.push({
    ...newOT,
    activa: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  saveOTs(ots);
}

export function updateOT(id, updatedFields) {
  const ots = getOTs();

  const updated = ots.map(ot =>
    ot.id === id
      ? { ...ot, ...updatedFields, updatedAt: new Date().toISOString() }
      : ot
  );

  saveOTs(updated);
}

export function deactivateOT(id) {
  const ots = getOTs();

  const updated = ots.map(ot =>
    ot.id === id ? { ...ot, activa: false } : ot
  );

  saveOTs(updated);
}
