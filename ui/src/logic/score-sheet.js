export default class ScoreSheet {
  constructor (sortedNodes = []) {
    this.nodes = this._fillNodes(sortedNodes)
  }

  updateNode (node) {

  }

  _fillNodes (existing) {
    return (existing.length > 0) ? existing : new Array(10)
  }
}
