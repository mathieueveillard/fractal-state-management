export function upgradeElement(vnode: any): void {
  (window as any).componentHandler.upgradeElement(vnode.elm);
}
