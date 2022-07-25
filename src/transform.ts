import { compileScript } from 'vue/compiler-sfc'
import MagicString from 'magic-string'
import { filterMarco, parseVueSFC } from './utils'
import { DEFINE_OPTIONS_FN_NAME } from './constants'

export const transform = (code: string, id: string) => {
  if (!id.endsWith('.vue'))
    return

  if (!code.includes(DEFINE_OPTIONS_FN_NAME))
    return

  const sfc = parseVueSFC(code, id)
  if (!sfc.scriptSetup)
    return

  if (!sfc.scriptSetup.scriptSetupAst) {
    sfc.scriptSetup = compileScript(sfc, {
      id,
    })
  }

  const { scriptSetup, source } = sfc
  const startOffset = scriptSetup.loc.start.offset
  const nodes = filterMarco(scriptSetup)

  if (nodes.length === 0)
    return
  else if (nodes.length > 1)
    throw new SyntaxError(`duplicate ${DEFINE_OPTIONS_FN_NAME}() call`)

  const [node] = nodes
  const [arg] = node.arguments
  if (!(node.arguments.length === 1 && arg.type === 'ObjectExpression'))
    throw new SyntaxError(`${DEFINE_OPTIONS_FN_NAME}() arguments error`)

  const argText = code.slice(startOffset + arg.start!, startOffset + arg.end!)

  const s = new MagicString(source)
  const lang = scriptSetup.attrs.lang ? `lang="${scriptSetup.attrs.lang}"` : ''

  s.prepend(`<script ${lang}>
  export default ${argText}
</script>
`)
  s.remove(startOffset + node.start!, startOffset + node.end!)

  return {
    code: s.toString(),
    get map() {
      return s.generateMap({
        source: id,
        includeContent: true,
      })
    },
  }
}
