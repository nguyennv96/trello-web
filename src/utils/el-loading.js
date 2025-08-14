import { ElLoading } from 'element-plus'

export function getLoading(message) {
  return ElLoading.service({
    text: message || 'Đang tải...',
    background: 'rgba(0, 0, 0, 0.7)',
    svg:
      '<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">\n' +
      '  <circle cx="400" cy="400" fill="none"\n' +
      '    r="200" stroke-width="86" stroke="#dd7b06"\n' +
      '    stroke-dasharray="700 1400" />\n' +
      '</svg>',
    customClass: 'loading',
  })
}
