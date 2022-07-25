import type { CallExpression, Node } from '@babel/types'
import type { SFCScriptBlock } from 'vue/compiler-sfc'
import { parse } from 'vue/compiler-sfc'
import { DEFINE_OPTIONS_FN_NAME } from './constants'

export const parseVueSFC = (code: string, id: string) => {
  const { descriptor } = parse(code, {
    filename: id,
  })

  return descriptor
}

export const isCalledBy = (
  node: Node | null | undefined,
  fnName: string,
): node is CallExpression => {
  return !!(
    node
    && node.type === 'CallExpression'
    && node.callee.type === 'Identifier'
    && node.callee.name === fnName
  )
}

export const filterMarco = (scriptSetup: SFCScriptBlock) => {
  return scriptSetup
    .scriptSetupAst!.map((raw: Node) => {
    let node = raw
    if (raw.type === 'ExpressionStatement')
      node = raw.expression
    return isCalledBy(node, DEFINE_OPTIONS_FN_NAME) ? node : undefined
  })
    .filter((node): node is CallExpression => !!node)
}
