export function get(sel) {
  return document.querySelector(sel)
}

function getAll(sel) {
  return Array.from(document.querySelector(sel))
}
