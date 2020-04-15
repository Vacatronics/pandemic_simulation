const HEALTH_HELPERS = {
  normal: {label: 'Normal', color: 'blue'},
  symptoms_none: {label: 'Sem Sintomas', color: '#f2d0cc'},
  symptoms_light: {label: 'Sintomas Leves', color: '#e6e7e8'},
  symptoms_severe: {label: 'Sintomas Severos', color: '#c7c8ca'},
  symptoms_critical: {label: 'Sintomas Críticos', color: '#58595b'},
  dead: {label: 'Morto', color: '#'},
  immune: {label: 'Imune', color: '#d1214e'}
}

const HEALTH_KEYS = Object.keys(HEALTH_HELPERS)

export {HEALTH_HELPERS, HEALTH_KEYS}