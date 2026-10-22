import { SupportedLanguage, LanguageImplementation } from './multiLanguage';

export const TREE_MULTI_LANG_SOLUTIONS: Record<string, Record<SupportedLanguage, LanguageImplementation>> = {
  'maximum-depth-of-binary-tree': {
    JavaScript: {
      code: "function maxDepth(root) {\n  if (root === null) return 0;\n\n  const leftDepth = maxDepth(root.left);\n  const rightDepth = maxDepth(root.right);\n  const depth = 1 + Math.max(leftDepth, rightDepth);\n\n  return depth;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9},
    },
    TypeScript: {
      code: "function maxDepth(root: TreeNode | null): number {\n  if (root === null) return 0;\n\n  const leftDepth = maxDepth(root.left);\n  const rightDepth = maxDepth(root.right);\n  const depth = 1 + Math.max(leftDepth, rightDepth);\n\n  return depth;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9},
    },
    Python: {
      code: "def maxDepth(root: Optional[TreeNode]) -> int:\n    if not root:\n        return 0\n\n    leftDepth = maxDepth(root.left)\n    rightDepth = maxDepth(root.right)\n    depth = 1 + max(leftDepth, rightDepth)\n\n    return depth",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9},
    },
    Java: {
      code: "public int maxDepth(TreeNode root) {\n    if (root == null) return 0;\n\n    int leftDepth = maxDepth(root.left);\n    int rightDepth = maxDepth(root.right);\n    int depth = 1 + Math.max(leftDepth, rightDepth);\n\n    return depth;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9},
    },
    'C++': {
      code: "int maxDepth(TreeNode* root) {\n    if (!root) return 0;\n\n    int leftDepth = maxDepth(root->left);\n    int rightDepth = maxDepth(root->right);\n    int depth = 1 + max(leftDepth, rightDepth);\n\n    return depth;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9},
    },
  },
  'same-tree': {
    JavaScript: {
      code: "function isSameTree(p, q) {\n  if (p === null && q === null) return true;\n  if (p === null || q === null) {\n    return false;\n  }\n\n  if (p.val !== q.val) {\n    return false;\n  }\n\n  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12},
    },
    TypeScript: {
      code: "function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {\n  if (p === null && q === null) return true;\n  if (p === null || q === null) {\n    return false;\n  }\n\n  if (p.val !== q.val) {\n    return false;\n  }\n\n  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12},
    },
    Python: {
      code: "def isSameTree(p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:\n    if not p and not q:\n        return True\n    if not p or not q:\n        return False\n\n    if p.val != q.val:\n        return False\n\n    return isSameTree(p.left, q.left) and isSameTree(p.right, q.right)",
      lineMap: {"1":1,"2":2,"3":3,"4":3,"5":4,"6":5,"7":6,"8":7,"9":8,"10":8,"11":9,"12":10},
    },
    Java: {
      code: "public boolean isSameTree(TreeNode p, TreeNode q) {\n    if (p == null && q == null) return true;\n    if (p == null || q == null) {\n        return false;\n    }\n\n    if (p.val != q.val) {\n        return false;\n    }\n\n    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12},
    },
    'C++': {
      code: "bool isSameTree(TreeNode* p, TreeNode* q) {\n    if (!p && !q) return true;\n    if (!p || !q) {\n        return false;\n    }\n\n    if (p->val != q->val) {\n        return false;\n    }\n\n    return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12},
    },
  },
  'invert-binary-tree': {
    JavaScript: {
      code: "function invertTree(root) {\n  if (root === null) return null;\n\n  const temp = root.left;\n  root.left = root.right;\n  root.right = temp;\n\n  invertTree(root.left);\n  invertTree(root.right);\n\n  return root;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12},
    },
    TypeScript: {
      code: "function invertTree(root: TreeNode | null): TreeNode | null {\n  if (root === null) return null;\n\n  const temp = root.left;\n  root.left = root.right;\n  root.right = temp;\n\n  invertTree(root.left);\n  invertTree(root.right);\n\n  return root;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12},
    },
    Python: {
      code: "def invertTree(root: Optional[TreeNode]) -> Optional[TreeNode]:\n    if not root:\n        return None\n\n    temp = root.left\n    root.left = root.right\n    root.right = temp\n\n    invertTree(root.left)\n    invertTree(root.right)\n\n    return root",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12},
    },
    Java: {
      code: "public TreeNode invertTree(TreeNode root) {\n    if (root == null) return null;\n\n    TreeNode temp = root.left;\n    root.left = root.right;\n    root.right = temp;\n\n    invertTree(root.left);\n    invertTree(root.right);\n\n    return root;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12},
    },
    'C++': {
      code: "TreeNode* invertTree(TreeNode* root) {\n    if (!root) return nullptr;\n\n    TreeNode* temp = root->left;\n    root->left = root->right;\n    root->right = temp;\n\n    invertTree(root->left);\n    invertTree(root->right);\n\n    return root;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12},
    },
  },
  'symmetric-tree': {
    JavaScript: {
      code: "function isSymmetric(root) {\n  if (root === null) return true;\n\n  function isMirror(t1, t2) {\n    if (t1 === null && t2 === null) return true;\n    if (t1 === null || t2 === null) {\n      return false;\n    }\n    if (t1.val !== t2.val) {\n      return false;\n    }\n\n    return isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left);\n  }\n\n  return isMirror(root.left, root.right);\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17},
    },
    TypeScript: {
      code: "function isSymmetric(root: TreeNode | null): boolean {\n  if (root === null) return true;\n\n  function isMirror(t1: TreeNode | null, t2: TreeNode | null): boolean {\n    if (t1 === null && t2 === null) return true;\n    if (t1 === null || t2 === null) {\n      return false;\n    }\n    if (t1.val !== t2.val) {\n      return false;\n    }\n\n    return isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left);\n  }\n\n  return isMirror(root.left, root.right);\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17},
    },
    Python: {
      code: "def isSymmetric(root: Optional[TreeNode]) -> bool:\n    if not root:\n        return True\n\n    def isMirror(t1: Optional[TreeNode], t2: Optional[TreeNode]) -> bool:\n        if not t1 and not t2:\n            return True\n        if not t1 or not t2:\n            return False\n        if t1.val != t2.val:\n            return False\n\n        return isMirror(t1.left, t2.right) and isMirror(t1.right, t2.left)\n\n    return isMirror(root.left, root.right)",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":4,"6":5,"7":6,"8":7,"9":8,"10":9,"11":10,"12":11,"13":11,"14":12,"15":13,"16":14,"17":15},
    },
    Java: {
      code: "public boolean isSymmetric(TreeNode root) {\n    if (root == null) return true;\n\n    return isMirror(root.left, root.right);\n}\n\nprivate boolean isMirror(TreeNode t1, TreeNode t2) {\n    if (t1 == null && t2 == null) return true;\n    if (t1 == null || t2 == null) {\n        return false;\n    }\n    if (t1.val != t2.val) {\n        return false;\n    }\n\n    return isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left);\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17},
    },
    'C++': {
      code: "bool isSymmetric(TreeNode* root) {\n    if (!root) return true;\n\n    return isMirror(root->left, root->right);\n}\n\nbool isMirror(TreeNode* t1, TreeNode* t2) {\n    if (!t1 && !t2) return true;\n    if (!t1 || !t2) {\n        return false;\n    }\n    if (t1->val != t2->val) {\n        return false;\n    }\n\n    return isMirror(t1->left, t2->right) && isMirror(t1->right, t2->left);\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17},
    },
  },
  'construct-binary-tree-from-preorder-and-inorder-traversal': {
    JavaScript: {
      code: "function buildTree(preorder, inorder) {\n  const inorderIndexMap = new Map();\n  for (let i = 0; i < inorder.length; i++) {\n    inorderIndexMap.set(inorder[i], i);\n  }\n\n  let preIdx = 0;\n\n  function helper(left, right) {\n    if (left > right) return null;\n\n    const rootVal = preorder[preIdx];\n    preIdx++;\n    const root = { val: rootVal, left: null, right: null };\n    const mid = inorderIndexMap.get(rootVal);\n\n    root.left = helper(left, mid - 1);\n    root.right = helper(mid + 1, right);\n\n    return root;\n  }\n\n  return helper(0, inorder.length - 1);\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,"21":21,"22":22,"23":23,"24":24},
    },
    TypeScript: {
      code: "function buildTree(preorder: number[], inorder: number[]): TreeNode | null {\n  const inorderIndexMap = new Map<number, number>();\n  for (let i = 0; i < inorder.length; i++) {\n    inorderIndexMap.set(inorder[i]!, i);\n  }\n\n  let preIdx = 0;\n\n  function helper(left: number, right: number): TreeNode | null {\n    if (left > right) return null;\n\n    const rootVal = preorder[preIdx]!;\n    preIdx++;\n    const root = new TreeNode(rootVal);\n    const mid = inorderIndexMap.get(rootVal)!;\n\n    root.left = helper(left, mid - 1);\n    root.right = helper(mid + 1, right);\n\n    return root;\n  }\n\n  return helper(0, inorder.length - 1);\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,"21":21,"22":22,"23":23,"24":24},
    },
    Python: {
      code: "def buildTree(preorder: list[int], inorder: list[int]) -> Optional[TreeNode]:\n    inorderIndexMap = {val: i for i, val in enumerate(inorder)}\n    preIdx = 0\n\n    def helper(left: int, right: int) -> Optional[TreeNode]:\n        nonlocal preIdx\n        if left > right:\n            return None\n\n        rootVal = preorder[preIdx]\n        preIdx += 1\n        root = TreeNode(rootVal)\n        mid = inorderIndexMap[rootVal]\n\n        root.left = helper(left, mid - 1)\n        root.right = helper(mid + 1, right)\n\n        return root\n\n    return helper(0, len(inorder) - 1)",
      lineMap: {"1":1,"2":2,"3":3,"4":3,"5":4,"6":5,"7":6,"8":7,"9":8,"10":8,"11":9,"12":10,"13":11,"14":12,"15":13,"16":13,"17":14,"18":15,"19":16,"20":17,"21":18,"22":18,"23":19,"24":20},
    },
    Java: {
      code: "public TreeNode buildTree(int[] preorder, int[] inorder) {\n    Map<Integer, Integer> inorderIndexMap = new HashMap<>();\n    for (int i = 0; i < inorder.length; i++) {\n        inorderIndexMap.put(inorder[i], i);\n    }\n\n    int[] preIdx = new int[]{0};\n    return helper(preorder, inorderIndexMap, preIdx, 0, inorder.length - 1);\n}\n\nprivate TreeNode helper(int[] preorder, Map<Integer, Integer> inorderIndexMap, int[] preIdx, int left, int right) {\n    if (left > right) return null;\n\n    int rootVal = preorder[preIdx[0]++];\n    TreeNode root = new TreeNode(rootVal);\n    int mid = inorderIndexMap.get(rootVal);\n\n    root.left = helper(preorder, inorderIndexMap, preIdx, left, mid - 1);\n    root.right = helper(preorder, inorderIndexMap, preIdx, mid + 1, right);\n\n    return root;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":6,"8":7,"9":8,"10":9,"11":10,"12":11,"13":12,"14":13,"15":14,"16":15,"17":16,"18":17,"19":17,"20":18,"21":19,"22":20,"23":21,"24":22},
    },
    'C++': {
      code: "TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {\n    unordered_map<int, int> inorderIndexMap;\n    for (int i = 0; i < (int)inorder.size(); i++) {\n        inorderIndexMap[inorder[i]] = i;\n    }\n\n    int preIdx = 0;\n    return helper(preorder, inorderIndexMap, preIdx, 0, (int)inorder.size() - 1);\n}\n\nTreeNode* helper(vector<int>& preorder, unordered_map<int, int>& inorderIndexMap, int& preIdx, int left, int right) {\n    if (left > right) return nullptr;\n\n    int rootVal = preorder[preIdx++];\n    TreeNode* root = new TreeNode(rootVal);\n    int mid = inorderIndexMap[rootVal];\n\n    root->left = helper(preorder, inorderIndexMap, preIdx, left, mid - 1);\n    root->right = helper(preorder, inorderIndexMap, preIdx, mid + 1, right);\n\n    return root;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":6,"8":7,"9":8,"10":9,"11":10,"12":11,"13":12,"14":13,"15":14,"16":15,"17":16,"18":17,"19":17,"20":18,"21":19,"22":20,"23":21,"24":22},
    },
  },
  'construct-binary-tree-from-inorder-and-postorder-traversal': {
    JavaScript: {
      code: "function buildTree(inorder, postorder) {\n  const inorderIndexMap = new Map();\n  for (let i = 0; i < inorder.length; i++) {\n    inorderIndexMap.set(inorder[i], i);\n  }\n\n  let postIdx = postorder.length - 1;\n\n  function helper(left, right) {\n    if (left > right) return null;\n\n    const rootVal = postorder[postIdx];\n    postIdx--;\n    const root = { val: rootVal, left: null, right: null };\n    const mid = inorderIndexMap.get(rootVal);\n\n    root.right = helper(mid + 1, right);\n    root.left = helper(left, mid - 1);\n\n    return root;\n  }\n\n  return helper(0, inorder.length - 1);\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,"21":21,"22":22,"23":23,"24":24},
    },
    TypeScript: {
      code: "function buildTree(inorder: number[], postorder: number[]): TreeNode | null {\n  const inorderIndexMap = new Map<number, number>();\n  for (let i = 0; i < inorder.length; i++) {\n    inorderIndexMap.set(inorder[i]!, i);\n  }\n\n  let postIdx = postorder.length - 1;\n\n  function helper(left: number, right: number): TreeNode | null {\n    if (left > right) return null;\n\n    const rootVal = postorder[postIdx]!;\n    postIdx--;\n    const root = new TreeNode(rootVal);\n    const mid = inorderIndexMap.get(rootVal)!;\n\n    root.right = helper(mid + 1, right);\n    root.left = helper(left, mid - 1);\n\n    return root;\n  }\n\n  return helper(0, inorder.length - 1);\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,"21":21,"22":22,"23":23,"24":24},
    },
    Python: {
      code: "def buildTree(inorder: list[int], postorder: list[int]) -> Optional[TreeNode]:\n    inorderIndexMap = {val: i for i, val in enumerate(inorder)}\n    postIdx = len(postorder) - 1\n\n    def helper(left: int, right: int) -> Optional[TreeNode]:\n        nonlocal postIdx\n        if left > right:\n            return None\n\n        rootVal = postorder[postIdx]\n        postIdx -= 1\n        root = TreeNode(rootVal)\n        mid = inorderIndexMap[rootVal]\n\n        root.right = helper(mid + 1, right)\n        root.left = helper(left, mid - 1)\n\n        return root\n\n    return helper(0, len(inorder) - 1)",
      lineMap: {"1":1,"2":2,"3":3,"4":3,"5":4,"6":5,"7":6,"8":7,"9":8,"10":8,"11":9,"12":10,"13":11,"14":12,"15":13,"16":13,"17":14,"18":15,"19":16,"20":17,"21":18,"22":18,"23":19,"24":20},
    },
    Java: {
      code: "public TreeNode buildTree(int[] inorder, int[] postorder) {\n    Map<Integer, Integer> inorderIndexMap = new HashMap<>();\n    for (int i = 0; i < inorder.length; i++) {\n        inorderIndexMap.put(inorder[i], i);\n    }\n\n    int[] postIdx = new int[]{postorder.length - 1};\n    return helper(postorder, inorderIndexMap, postIdx, 0, inorder.length - 1);\n}\n\nprivate TreeNode helper(int[] postorder, Map<Integer, Integer> inorderIndexMap, int[] postIdx, int left, int right) {\n    if (left > right) return null;\n\n    int rootVal = postorder[postIdx[0]--];\n    TreeNode root = new TreeNode(rootVal);\n    int mid = inorderIndexMap.get(rootVal);\n\n    root.right = helper(postorder, inorderIndexMap, postIdx, mid + 1, right);\n    root.left = helper(postorder, inorderIndexMap, postIdx, left, mid - 1);\n\n    return root;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":6,"8":7,"9":8,"10":9,"11":10,"12":11,"13":12,"14":13,"15":14,"16":15,"17":16,"18":17,"19":17,"20":18,"21":19,"22":20,"23":21,"24":22},
    },
    'C++': {
      code: "TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {\n    unordered_map<int, int> inorderIndexMap;\n    for (int i = 0; i < (int)inorder.size(); i++) {\n        inorderIndexMap[inorder[i]] = i;\n    }\n\n    int postIdx = (int)postorder.size() - 1;\n    return helper(postorder, inorderIndexMap, postIdx, 0, (int)inorder.size() - 1);\n}\n\nTreeNode* helper(vector<int>& postorder, unordered_map<int, int>& inorderIndexMap, int& postIdx, int left, int right) {\n    if (left > right) return nullptr;\n\n    int rootVal = postorder[postIdx--];\n    TreeNode* root = new TreeNode(rootVal);\n    int mid = inorderIndexMap[rootVal];\n\n    root->right = helper(postorder, inorderIndexMap, postIdx, mid + 1, right);\n    root->left = helper(postorder, inorderIndexMap, postIdx, left, mid - 1);\n\n    return root;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":6,"8":7,"9":8,"10":9,"11":10,"12":11,"13":12,"14":13,"15":14,"16":15,"17":16,"18":17,"19":17,"20":18,"21":19,"22":20,"23":21,"24":22},
    },
  },
  'populating-next-right-pointers-in-each-node-ii': {
    JavaScript: {
      code: "function connect(root) {\n  if (root === null) return null;\n\n  let head = root;\n\n  while (head !== null) {\n    const dummyHead = { val: 0, next: null };\n    let tail = dummyHead;\n    let curr = head;\n\n    while (curr !== null) {\n      if (curr.left !== null) {\n        tail.next = curr.left;\n        tail = tail.next;\n      }\n      if (curr.right !== null) {\n        tail.next = curr.right;\n        tail = tail.next;\n      }\n      curr = curr.next || null;\n    }\n\n    head = dummyHead.next;\n  }\n\n  return root;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,"21":21,"22":22,"23":23,"24":24,"25":25,"26":26,"27":27},
    },
    TypeScript: {
      code: "function connect(root: Node | null): Node | null {\n  if (root === null) return null;\n\n  let head: Node | null = root;\n\n  while (head !== null) {\n    const dummyHead: Node = new Node(0);\n    let tail: Node = dummyHead;\n    let curr: Node | null = head;\n\n    while (curr !== null) {\n      if (curr.left !== null) {\n        tail.next = curr.left;\n        tail = tail.next;\n      }\n      if (curr.right !== null) {\n        tail.next = curr.right;\n        tail = tail.next;\n      }\n      curr = curr.next;\n    }\n\n    head = dummyHead.next;\n  }\n\n  return root;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,"21":21,"22":22,"23":23,"24":24,"25":25,"26":26,"27":27},
    },
    Python: {
      code: "def connect(root: Optional['Node']) -> Optional['Node']:\n    if not root:\n        return None\n\n    head = root\n\n    while head:\n        dummyHead = Node(0)\n        tail = dummyHead\n        curr = head\n\n        while curr:\n            if curr.left:\n                tail.next = curr.left\n                tail = tail.next\n            if curr.right:\n                tail.next = curr.right\n                tail = tail.next\n            curr = curr.next\n\n        head = dummyHead.next\n\n    return root",
      lineMap: {"1":1,"2":2,"3":3,"4":3,"5":4,"6":5,"7":6,"8":7,"9":8,"10":9,"11":9,"12":10,"13":11,"14":12,"15":13,"16":14,"17":14,"18":15,"19":16,"20":17,"21":18,"22":19,"23":20,"24":20,"25":21,"26":22,"27":23},
    },
    Java: {
      code: "public Node connect(Node root) {\n    if (root == null) return null;\n\n    Node head = root;\n\n    while (head != null) {\n        Node dummyHead = new Node(0);\n        Node tail = dummyHead;\n        Node curr = head;\n\n        while (curr != null) {\n            if (curr.left != null) {\n                tail.next = curr.left;\n                tail = tail.next;\n            }\n            if (curr.right != null) {\n                tail.next = curr.right;\n                tail = tail.next;\n            }\n            curr = curr.next;\n        }\n\n        head = dummyHead.next;\n    }\n\n    return root;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,"21":21,"22":22,"23":23,"24":24,"25":25,"26":26,"27":27},
    },
    'C++': {
      code: "Node* connect(Node* root) {\n    if (!root) return nullptr;\n\n    Node* head = root;\n\n    while (head) {\n        Node dummyHead(0);\n        Node* tail = &dummyHead;\n        Node* curr = head;\n\n        while (curr) {\n            if (curr->left) {\n                tail->next = curr->left;\n                tail = tail->next;\n            }\n            if (curr->right) {\n                tail->next = curr->right;\n                tail = tail->next;\n            }\n            curr = curr->next;\n        }\n\n        head = dummyHead.next;\n    }\n\n    return root;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,"21":21,"22":22,"23":23,"24":24,"25":25,"26":26,"27":27},
    },
  },
  'flatten-binary-tree-to-linked-list': {
    JavaScript: {
      code: "function flatten(root) {\n  let curr = root;\n\n  while (curr !== null) {\n    if (curr.left !== null) {\n      let runner = curr.left;\n      while (runner.right !== null) {\n        runner = runner.right;\n      }\n\n      runner.right = curr.right;\n      curr.right = curr.left;\n      curr.left = null;\n    }\n\n    curr = curr.right;\n  }\n\n  return root;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20},
    },
    TypeScript: {
      code: "function flatten(root: TreeNode | null): void {\n  let curr: TreeNode | null = root;\n\n  while (curr !== null) {\n    if (curr.left !== null) {\n      let runner: TreeNode = curr.left;\n      while (runner.right !== null) {\n        runner = runner.right;\n      }\n\n      runner.right = curr.right;\n      curr.right = curr.left;\n      curr.left = null;\n    }\n\n    curr = curr.right;\n  }\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":5,"7":6,"8":7,"9":8,"10":9,"11":10,"12":11,"13":12,"14":13,"15":14,"16":14,"17":15,"18":16,"19":17,"20":18},
    },
    Python: {
      code: "def flatten(root: Optional[TreeNode]) -> None:\n    curr = root\n\n    while curr:\n        if curr.left:\n            runner = curr.left\n            while runner.right:\n                runner = runner.right\n\n            runner.right = curr.right\n            curr.right = curr.left\n            curr.left = None\n\n        curr = curr.right",
      lineMap: {"1":1,"2":1,"3":2,"4":3,"5":4,"6":4,"7":5,"8":6,"9":6,"10":7,"11":8,"12":8,"13":9,"14":10,"15":11,"16":11,"17":12,"18":13,"19":13,"20":14},
    },
    Java: {
      code: "public void flatten(TreeNode root) {\n    TreeNode curr = root;\n\n    while (curr != null) {\n        if (curr.left != null) {\n            TreeNode runner = curr.left;\n            while (runner.right != null) {\n                runner = runner.right;\n            }\n\n            runner.right = curr.right;\n            curr.right = curr.left;\n            curr.left = null;\n        }\n\n        curr = curr.right;\n    }\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":5,"7":6,"8":7,"9":8,"10":9,"11":10,"12":11,"13":12,"14":13,"15":14,"16":14,"17":15,"18":16,"19":17,"20":18},
    },
    'C++': {
      code: "void flatten(TreeNode* root) {\n    TreeNode* curr = root;\n\n    while (curr) {\n        if (curr->left) {\n            TreeNode* runner = curr->left;\n            while (runner->right) {\n                runner = runner->right;\n            }\n\n            runner->right = curr->right;\n            curr->right = curr->left;\n            curr->left = nullptr;\n        }\n\n        curr = curr->right;\n    }\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":5,"7":6,"8":7,"9":8,"10":9,"11":10,"12":11,"13":12,"14":13,"15":14,"16":14,"17":15,"18":16,"19":17,"20":18},
    },
  },
  'path-sum': {
    JavaScript: {
      code: "function hasPathSum(root, targetSum) {\n  if (root === null) return false;\n\n  const remaining = targetSum - root.val;\n\n  if (root.left === null && root.right === null) {\n    const isMatch = remaining === 0;\n    return isMatch;\n  }\n\n  return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining);\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12},
    },
    TypeScript: {
      code: "function hasPathSum(root: TreeNode | null, targetSum: number): boolean {\n  if (root === null) return false;\n\n  const remaining = targetSum - root.val;\n\n  if (root.left === null && root.right === null) {\n    const isMatch = remaining === 0;\n    return isMatch;\n  }\n\n  return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining);\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12},
    },
    Python: {
      code: "def hasPathSum(root: Optional[TreeNode], targetSum: int) -> bool:\n    if not root:\n        return False\n\n    remaining = targetSum - root.val\n\n    if not root.left and not root.right:\n        isMatch = (remaining == 0)\n        return isMatch\n\n    return hasPathSum(root.left, remaining) or hasPathSum(root.right, remaining)",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":6,"8":7,"9":8,"10":9,"11":10,"12":11},
    },
    Java: {
      code: "public boolean hasPathSum(TreeNode root, int targetSum) {\n    if (root == null) return false;\n\n    int remaining = targetSum - root.val;\n\n    if (root.left == null && root.right == null) {\n        boolean isMatch = (remaining == 0);\n        return isMatch;\n    }\n\n    return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining);\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12},
    },
    'C++': {
      code: "bool hasPathSum(TreeNode* root, int targetSum) {\n    if (!root) return false;\n\n    int remaining = targetSum - root->val;\n\n    if (!root->left && !root->right) {\n        bool isMatch = (remaining == 0);\n        return isMatch;\n    }\n\n    return hasPathSum(root->left, remaining) || hasPathSum(root->right, remaining);\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12},
    },
  },
  'sum-root-to-leaf-numbers': {
    JavaScript: {
      code: "function sumNumbers(root) {\n  function dfs(node, currentSum) {\n    if (node === null) return 0;\n\n    currentSum = currentSum * 10 + node.val;\n\n    if (node.left === null && node.right === null) {\n      return currentSum;\n    }\n\n    return dfs(node.left, currentSum) + dfs(node.right, currentSum);\n  }\n\n  return dfs(root, 0);\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15},
    },
    TypeScript: {
      code: "function sumNumbers(root: TreeNode | null): number {\n  function dfs(node: TreeNode | null, currentSum: number): number {\n    if (node === null) return 0;\n\n    currentSum = currentSum * 10 + node.val;\n\n    if (node.left === null && node.right === null) {\n      return currentSum;\n    }\n\n    return dfs(node.left, currentSum) + dfs(node.right, currentSum);\n  }\n\n  return dfs(root, 0);\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15},
    },
    Python: {
      code: "def sumNumbers(root: Optional[TreeNode]) -> int:\n    def dfs(node: Optional[TreeNode], currentSum: int) -> int:\n        if not node:\n            return 0\n\n        currentSum = currentSum * 10 + node.val\n\n        if not node.left and not node.right:\n            return currentSum\n\n        return dfs(node.left, currentSum) + dfs(node.right, currentSum)\n\n    return dfs(root, 0)",
      lineMap: {"1":1,"2":2,"3":3,"4":3,"5":4,"6":5,"7":6,"8":7,"9":8,"10":9,"11":10,"12":10,"13":11,"14":12,"15":13},
    },
    Java: {
      code: "public int sumNumbers(TreeNode root) {\n    return dfs(root, 0);\n}\n\nprivate int dfs(TreeNode node, int currentSum) {\n    if (node == null) return 0;\n\n    currentSum = currentSum * 10 + node.val;\n\n    if (node.left == null && node.right == null) {\n        return currentSum;\n    }\n\n    return dfs(node.left, currentSum) + dfs(node.right, currentSum);\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15},
    },
    'C++': {
      code: "int sumNumbers(TreeNode* root) {\n    return dfs(root, 0);\n}\n\nint dfs(TreeNode* node, int currentSum) {\n    if (!node) return 0;\n\n    currentSum = currentSum * 10 + node->val;\n\n    if (!node->left && !node->right) {\n        return currentSum;\n    }\n\n    return dfs(node->left, currentSum) + dfs(node->right, currentSum);\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15},
    },
  },
  'binary-tree-maximum-path-sum': {
    JavaScript: {
      code: "function maxPathSum(root) {\n  let maxSum = -Infinity;\n\n  function maxGain(node) {\n    if (node === null) return 0;\n\n    const leftGain = Math.max(maxGain(node.left), 0);\n    const rightGain = Math.max(maxGain(node.right), 0);\n    const currentPrice = node.val + leftGain + rightGain;\n\n    if (currentPrice > maxSum) {\n      maxSum = currentPrice;\n    }\n\n    return node.val + Math.max(leftGain, rightGain);\n  }\n\n  maxGain(root);\n  return maxSum;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20},
    },
    TypeScript: {
      code: "function maxPathSum(root: TreeNode | null): number {\n  let maxSum = -Infinity;\n\n  function maxGain(node: TreeNode | null): number {\n    if (node === null) return 0;\n\n    const leftGain = Math.max(maxGain(node.left), 0);\n    const rightGain = Math.max(maxGain(node.right), 0);\n    const currentPrice = node.val + leftGain + rightGain;\n\n    if (currentPrice > maxSum) {\n      maxSum = currentPrice;\n    }\n\n    return node.val + Math.max(leftGain, rightGain);\n  }\n\n  maxGain(root);\n  return maxSum;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20},
    },
    Python: {
      code: "def maxPathSum(root: Optional[TreeNode]) -> int:\n    maxSum = float('-inf')\n\n    def maxGain(node: Optional[TreeNode]) -> int:\n        nonlocal maxSum\n        if not node:\n            return 0\n\n        leftGain = max(maxGain(node.left), 0)\n        rightGain = max(maxGain(node.right), 0)\n        currentPrice = node.val + leftGain + rightGain\n\n        if currentPrice > maxSum:\n            maxSum = currentPrice\n\n        return node.val + max(leftGain, rightGain)\n\n    maxGain(root)\n    return maxSum",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":10,"12":11,"13":12,"14":13,"15":14,"16":15,"17":16,"18":17,"19":18,"20":19},
    },
    Java: {
      code: "public int maxPathSum(TreeNode root) {\n    int[] maxSum = new int[]{Integer.MIN_VALUE};\n    maxGain(root, maxSum);\n    return maxSum[0];\n}\n\nprivate int maxGain(TreeNode node, int[] maxSum) {\n    if (node == null) return 0;\n\n    int leftGain = Math.max(maxGain(node.left, maxSum), 0);\n    int rightGain = Math.max(maxGain(node.right, maxSum), 0);\n    int currentPrice = node.val + leftGain + rightGain;\n\n    if (currentPrice > maxSum[0]) {\n        maxSum[0] = currentPrice;\n    }\n\n    return node.val + Math.max(leftGain, rightGain);\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":10,"12":11,"13":12,"14":13,"15":14,"16":15,"17":16,"18":17,"19":18,"20":19},
    },
    'C++': {
      code: "int maxPathSum(TreeNode* root) {\n    int maxSum = INT_MIN;\n    maxGain(root, maxSum);\n    return maxSum;\n}\n\nint maxGain(TreeNode* node, int& maxSum) {\n    if (!node) return 0;\n\n    int leftGain = max(maxGain(node->left, maxSum), 0);\n    int rightGain = max(maxGain(node->right, maxSum), 0);\n    int currentPrice = node->val + leftGain + rightGain;\n\n    if (currentPrice > maxSum) {\n        maxSum = currentPrice;\n    }\n\n    return node->val + max(leftGain, rightGain);\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":10,"12":11,"13":12,"14":13,"15":14,"16":15,"17":16,"18":17,"19":18,"20":19},
    },
  },
  'binary-search-tree-iterator': {
    JavaScript: {
      code: "function bstIterator(root) {\n  const stack = [];\n  const result = [];\n\n  let curr = root;\n  while (curr !== null) {\n    stack.push(curr);\n    curr = curr.left;\n  }\n\n  while (stack.length > 0) {\n    const node = stack.pop();\n    result.push(node.val);\n\n    let nextNode = node.right;\n    while (nextNode !== null) {\n      stack.push(nextNode);\n      nextNode = nextNode.left;\n    }\n  }\n\n  return result;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,"21":21,"22":22,"23":23},
    },
    TypeScript: {
      code: "function bstIterator(root: TreeNode | null): number[] {\n  const stack: TreeNode[] = [];\n  const result: number[] = [];\n\n  let curr: TreeNode | null = root;\n  while (curr !== null) {\n    stack.push(curr);\n    curr = curr.left;\n  }\n\n  while (stack.length > 0) {\n    const node = stack.pop()!;\n    result.push(node.val);\n\n    let nextNode = node.right;\n    while (nextNode !== null) {\n      stack.push(nextNode);\n      nextNode = nextNode.left;\n    }\n  }\n\n  return result;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,"21":21,"22":22,"23":23},
    },
    Python: {
      code: "def bstIterator(root: Optional[TreeNode]) -> list[int]:\n    stack = []\n    result = []\n\n    curr = root\n    while curr:\n        stack.append(curr)\n        curr = curr.left\n\n    while stack:\n        node = stack.pop()\n        result.append(node.val)\n\n        nextNode = node.right\n        while nextNode:\n            stack.append(nextNode)\n            nextNode = nextNode.left\n\n    return result",
      lineMap: {"1":1,"2":2,"3":2,"4":3,"5":4,"6":5,"7":6,"8":7,"9":7,"10":8,"11":9,"12":10,"13":11,"14":12,"15":12,"16":13,"17":14,"18":15,"19":16,"20":17,"21":17,"22":18,"23":19},
    },
    Java: {
      code: "public List<Integer> bstIterator(TreeNode root) {\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    List<Integer> result = new ArrayList<>();\n\n    TreeNode curr = root;\n    while (curr != null) {\n        stack.push(curr);\n        curr = curr.left;\n    }\n\n    while (!stack.isEmpty()) {\n        TreeNode node = stack.pop();\n        result.add(node.val);\n\n        TreeNode nextNode = node.right;\n        while (nextNode != null) {\n            stack.push(nextNode);\n            nextNode = nextNode.left;\n        }\n    }\n\n    return result;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,"21":21,"22":22,"23":23},
    },
    'C++': {
      code: "vector<int> bstIterator(TreeNode* root) {\n    vector<TreeNode*> stack;\n    vector<int> result;\n\n    TreeNode* curr = root;\n    while (curr) {\n        stack.push_back(curr);\n        curr = curr->left;\n    }\n\n    while (!stack.empty()) {\n        TreeNode* node = stack.back();\n        stack.pop_back();\n        result.push_back(node->val);\n\n        TreeNode* nextNode = node->right;\n        while (nextNode) {\n            stack.push_back(nextNode);\n            nextNode = nextNode->left;\n        }\n    }\n\n    return result;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":13,"13":14,"14":15,"15":16,"16":17,"17":18,"18":19,"19":20,"20":21,"21":22,"22":23,"23":24},
    },
  },
  'count-complete-tree-nodes': {
    JavaScript: {
      code: "function countNodes(root) {\n  if (root === null) return 0;\n\n  let leftHeight = 0;\n  let currLeft = root;\n  while (currLeft !== null) {\n    leftHeight++;\n    currLeft = currLeft.left;\n  }\n\n  let rightHeight = 0;\n  let currRight = root;\n  while (currRight !== null) {\n    rightHeight++;\n    currRight = currRight.right;\n  }\n\n  if (leftHeight === rightHeight) {\n    const fullCount = (1 << leftHeight) - 1;\n    return fullCount;\n  }\n\n  return 1 + countNodes(root.left) + countNodes(root.right);\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,"21":21,"22":22,"23":23,"24":24},
    },
    TypeScript: {
      code: "function countNodes(root: TreeNode | null): number {\n  if (root === null) return 0;\n\n  let leftHeight = 0;\n  let currLeft: TreeNode | null = root;\n  while (currLeft !== null) {\n    leftHeight++;\n    currLeft = currLeft.left;\n  }\n\n  let rightHeight = 0;\n  let currRight: TreeNode | null = root;\n  while (currRight !== null) {\n    rightHeight++;\n    currRight = currRight.right;\n  }\n\n  if (leftHeight === rightHeight) {\n    const fullCount = (1 << leftHeight) - 1;\n    return fullCount;\n  }\n\n  return 1 + countNodes(root.left) + countNodes(root.right);\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,"21":21,"22":22,"23":23,"24":24},
    },
    Python: {
      code: "def countNodes(root: Optional[TreeNode]) -> int:\n    if not root:\n        return 0\n\n    leftHeight = 0\n    currLeft = root\n    while currLeft:\n        leftHeight += 1\n        currLeft = currLeft.left\n\n    rightHeight = 0\n    currRight = root\n    while currRight:\n        rightHeight += 1\n        currRight = currRight.right\n\n    if leftHeight == rightHeight:\n        fullCount = (1 << leftHeight) - 1\n        return fullCount\n\n    return 1 + countNodes(root.left) + countNodes(root.right)",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":4,"6":5,"7":6,"8":7,"9":8,"10":9,"11":10,"12":11,"13":11,"14":12,"15":13,"16":14,"17":15,"18":16,"19":17,"20":18,"21":18,"22":19,"23":20,"24":21},
    },
    Java: {
      code: "public int countNodes(TreeNode root) {\n    if (root == null) return 0;\n\n    int leftHeight = 0;\n    TreeNode currLeft = root;\n    while (currLeft != null) {\n        leftHeight++;\n        currLeft = currLeft.left;\n    }\n\n    int rightHeight = 0;\n    TreeNode currRight = root;\n    while (currRight != null) {\n        rightHeight++;\n        currRight = currRight.right;\n    }\n\n    if (leftHeight == rightHeight) {\n        int fullCount = (1 << leftHeight) - 1;\n        return fullCount;\n    }\n\n    return 1 + countNodes(root.left) + countNodes(root.right);\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,"21":21,"22":22,"23":23,"24":24},
    },
    'C++': {
      code: "int countNodes(TreeNode* root) {\n    if (!root) return 0;\n\n    int leftHeight = 0;\n    TreeNode* currLeft = root;\n    while (currLeft) {\n        leftHeight++;\n        currLeft = currLeft->left;\n    }\n\n    int rightHeight = 0;\n    TreeNode* currRight = root;\n    while (currRight) {\n        rightHeight++;\n        currRight = currRight->right;\n    }\n\n    if (leftHeight == rightHeight) {\n        int fullCount = (1 << leftHeight) - 1;\n        return fullCount;\n    }\n\n    return 1 + countNodes(root->left) + countNodes(root->right);\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,"21":21,"22":22,"23":23,"24":24},
    },
  },
  'lowest-common-ancestor-of-a-binary-tree': {
    JavaScript: {
      code: "function lowestCommonAncestor(root, pVal, qVal) {\n  function findLCA(node) {\n    if (node === null) return null;\n    if (node.val === pVal || node.val === qVal) {\n      return node;\n    }\n\n    const left = findLCA(node.left);\n    const right = findLCA(node.right);\n\n    if (left !== null && right !== null) {\n      return node;\n    }\n\n    return left !== null ? left : right;\n  }\n\n  const result = findLCA(root);\n  return result !== null ? result.val : null;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20},
    },
    TypeScript: {
      code: "function lowestCommonAncestor(root: TreeNode | null, pVal: number, qVal: number): number | null {\n  function findLCA(node: TreeNode | null): TreeNode | null {\n    if (node === null) return null;\n    if (node.val === pVal || node.val === qVal) {\n      return node;\n    }\n\n    const left = findLCA(node.left);\n    const right = findLCA(node.right);\n\n    if (left !== null && right !== null) {\n      return node;\n    }\n\n    return left !== null ? left : right;\n  }\n\n  const result = findLCA(root);\n  return result !== null ? result.val : null;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20},
    },
    Python: {
      code: "def lowestCommonAncestor(root: Optional[TreeNode], pVal: int, qVal: int) -> Optional[int]:\n    def findLCA(node: Optional[TreeNode]) -> Optional[TreeNode]:\n        if not node:\n            return None\n        if node.val == pVal or node.val == qVal:\n            return node\n\n        left = findLCA(node.left)\n        right = findLCA(node.right)\n\n        if left and right:\n            return node\n\n        return left if left else right\n\n    result = findLCA(root)\n    return result.val if result else None",
      lineMap: {"1":1,"2":2,"3":3,"4":3,"5":4,"6":5,"7":6,"8":7,"9":8,"10":9,"11":9,"12":10,"13":11,"14":12,"15":13,"16":14,"17":14,"18":15,"19":16,"20":17},
    },
    Java: {
      code: "public Integer lowestCommonAncestor(TreeNode root, int pVal, int qVal) {\n    TreeNode result = findLCA(root, pVal, qVal);\n    return result != null ? result.val : null;\n}\n\nprivate TreeNode findLCA(TreeNode node, int pVal, int qVal) {\n    if (node == null) return null;\n    if (node.val == pVal || node.val == qVal) {\n        return node;\n    }\n\n    TreeNode left = findLCA(node.left, pVal, qVal);\n    TreeNode right = findLCA(node.right, pVal, qVal);\n\n    if (left != null && right != null) {\n        return node;\n    }\n\n    return left != null ? left : right;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20},
    },
    'C++': {
      code: "int lowestCommonAncestor(TreeNode* root, int pVal, int qVal) {\n    TreeNode* result = findLCA(root, pVal, qVal);\n    return result ? result->val : -1;\n}\n\nTreeNode* findLCA(TreeNode* node, int pVal, int qVal) {\n    if (!node) return nullptr;\n    if (node->val == pVal || node->val == qVal) {\n        return node;\n    }\n\n    TreeNode* left = findLCA(node->left, pVal, qVal);\n    TreeNode* right = findLCA(node->right, pVal, qVal);\n\n    if (left && right) {\n        return node;\n    }\n\n    return left ? left : right;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20},
    },
  },
  'binary-tree-right-side-view': {
    JavaScript: {
      code: "function rightSideView(root) {\n  if (root === null) return [];\n\n  const queue = [root];\n  const result = [];\n\n  while (queue.length > 0) {\n    const levelSize = queue.length;\n\n    for (let i = 0; i < levelSize; i++) {\n      const node = queue.shift();\n\n      if (i === levelSize - 1) {\n        result.push(node.val);\n      }\n\n      if (node.left !== null) queue.push(node.left);\n      if (node.right !== null) queue.push(node.right);\n    }\n  }\n\n  return result;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,"21":21,"22":22,"23":23},
    },
    TypeScript: {
      code: "function rightSideView(root: TreeNode | null): number[] {\n  if (root === null) return [];\n\n  const queue: TreeNode[] = [root];\n  const result: number[] = [];\n\n  while (queue.length > 0) {\n    const levelSize = queue.length;\n\n    for (let i = 0; i < levelSize; i++) {\n      const node = queue.shift()!;\n\n      if (i === levelSize - 1) {\n        result.push(node.val);\n      }\n\n      if (node.left !== null) queue.push(node.left);\n      if (node.right !== null) queue.push(node.right);\n    }\n  }\n\n  return result;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,"21":21,"22":22,"23":23},
    },
    Python: {
      code: "def rightSideView(root: Optional[TreeNode]) -> list[int]:\n    if not root:\n        return []\n\n    queue = collections.deque([root])\n    result = []\n\n    while queue:\n        levelSize = len(queue)\n\n        for i in range(levelSize):\n            node = queue.popleft()\n\n            if i == levelSize - 1:\n                result.append(node.val)\n\n            if node.left:\n                queue.append(node.left)\n            if node.right:\n                queue.append(node.right)\n\n    return result",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":11,"13":12,"14":13,"15":14,"16":15,"17":16,"18":17,"19":18,"20":19,"21":20,"22":21,"23":22},
    },
    Java: {
      code: "public List<Integer> rightSideView(TreeNode root) {\n    if (root == null) return new ArrayList<>();\n\n    Queue<TreeNode> queue = new LinkedList<>();\n    queue.offer(root);\n    List<Integer> result = new ArrayList<>();\n\n    while (!queue.isEmpty()) {\n        int levelSize = queue.size();\n\n        for (int i = 0; i < levelSize; i++) {\n            TreeNode node = queue.poll();\n\n            if (i == levelSize - 1) {\n                result.add(node.val);\n            }\n\n            if (node.left != null) queue.offer(node.left);\n            if (node.right != null) queue.offer(node.right);\n        }\n    }\n\n    return result;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":13,"13":14,"14":15,"15":16,"16":17,"17":18,"18":19,"19":20,"20":21,"21":22,"22":23,"23":24},
    },
    'C++': {
      code: "vector<int> rightSideView(TreeNode* root) {\n    if (!root) return {};\n\n    queue<TreeNode*> queue;\n    queue.push(root);\n    vector<int> result;\n\n    while (!queue.empty()) {\n        int levelSize = queue.size();\n\n        for (int i = 0; i < levelSize; i++) {\n            TreeNode* node = queue.front();\n            queue.pop();\n\n            if (i == levelSize - 1) {\n                result.push_back(node->val);\n            }\n\n            if (node->left) queue.push(node->left);\n            if (node->right) queue.push(node->right);\n        }\n    }\n\n    return result;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":7,"7":8,"8":9,"9":10,"10":11,"11":12,"12":13,"13":14,"14":15,"15":16,"16":17,"17":18,"18":20,"19":21,"20":22,"21":23,"22":24,"23":25},
    },
  },
  'average-of-levels-in-binary-tree': {
    JavaScript: {
      code: "function averageOfLevels(root) {\n  if (root === null) return [];\n\n  const queue = [root];\n  const averages = [];\n\n  while (queue.length > 0) {\n    const levelSize = queue.length;\n    let levelSum = 0;\n\n    for (let i = 0; i < levelSize; i++) {\n      const node = queue.shift();\n      levelSum += node.val;\n\n      if (node.left !== null) queue.push(node.left);\n      if (node.right !== null) queue.push(node.right);\n    }\n\n    const avg = levelSum / levelSize;\n    averages.push(avg);\n  }\n\n  return averages;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,"21":21,"22":22,"23":23,"24":24},
    },
    TypeScript: {
      code: "function averageOfLevels(root: TreeNode | null): number[] {\n  if (root === null) return [];\n\n  const queue: TreeNode[] = [root];\n  const averages: number[] = [];\n\n  while (queue.length > 0) {\n    const levelSize = queue.length;\n    let levelSum = 0;\n\n    for (let i = 0; i < levelSize; i++) {\n      const node = queue.shift()!;\n      levelSum += node.val;\n\n      if (node.left !== null) queue.push(node.left);\n      if (node.right !== null) queue.push(node.right);\n    }\n\n    const avg = levelSum / levelSize;\n    averages.push(avg);\n  }\n\n  return averages;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,"21":21,"22":22,"23":23,"24":24},
    },
    Python: {
      code: "def averageOfLevels(root: Optional[TreeNode]) -> list[float]:\n    if not root:\n        return []\n\n    queue = collections.deque([root])\n    averages = []\n\n    while queue:\n        levelSize = len(queue)\n        levelSum = 0\n\n        for i in range(levelSize):\n            node = queue.popleft()\n            levelSum += node.val\n\n            if node.left:\n                queue.append(node.left)\n            if node.right:\n                queue.append(node.right)\n\n        avg = levelSum / levelSize\n        averages.append(avg)\n\n    return averages",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,"21":21,"22":22,"23":23,"24":24},
    },
    Java: {
      code: "public List<Double> averageOfLevels(TreeNode root) {\n    if (root == null) return new ArrayList<>();\n\n    Queue<TreeNode> queue = new LinkedList<>();\n    queue.offer(root);\n    List<Double> averages = new ArrayList<>();\n\n    while (!queue.isEmpty()) {\n        int levelSize = queue.size();\n        double levelSum = 0;\n\n        for (int i = 0; i < levelSize; i++) {\n            TreeNode node = queue.poll();\n            levelSum += node.val;\n\n            if (node.left != null) queue.offer(node.left);\n            if (node.right != null) queue.offer(node.right);\n        }\n\n        double avg = levelSum / levelSize;\n        averages.add(avg);\n    }\n\n    return averages;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":13,"13":14,"14":15,"15":16,"16":17,"17":18,"18":19,"19":20,"20":21,"21":22,"22":23,"23":24,"24":25},
    },
    'C++': {
      code: "vector<double> averageOfLevels(TreeNode* root) {\n    if (!root) return {};\n\n    queue<TreeNode*> queue;\n    queue.push(root);\n    vector<double> averages;\n\n    while (!queue.empty()) {\n        int levelSize = queue.size();\n        double levelSum = 0;\n\n        for (int i = 0; i < levelSize; i++) {\n            TreeNode* node = queue.front();\n            queue.pop();\n            levelSum += node->val;\n\n            if (node->left) queue.push(node->left);\n            if (node->right) queue.push(node->right);\n        }\n\n        double avg = levelSum / levelSize;\n        averages.push_back(avg);\n    }\n\n    return averages;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":7,"7":8,"8":9,"9":10,"10":11,"11":12,"12":13,"13":14,"14":15,"15":16,"16":17,"17":18,"18":20,"19":21,"20":22,"21":23,"22":24,"23":25,"24":26},
    },
  },
  'binary-tree-level-order-traversal': {
    JavaScript: {
      code: "function levelOrder(root) {\n  if (root === null) return [];\n\n  const queue = [root];\n  const result = [];\n\n  while (queue.length > 0) {\n    const levelSize = queue.length;\n    const currentLevel = [];\n\n    for (let i = 0; i < levelSize; i++) {\n      const node = queue.shift();\n      currentLevel.push(node.val);\n\n      if (node.left !== null) queue.push(node.left);\n      if (node.right !== null) queue.push(node.right);\n    }\n\n    result.push(currentLevel);\n  }\n\n  return result;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,"21":21,"22":22,"23":23},
    },
    TypeScript: {
      code: "function levelOrder(root: TreeNode | null): number[][] {\n  if (root === null) return [];\n\n  const queue: TreeNode[] = [root];\n  const result: number[][] = [];\n\n  while (queue.length > 0) {\n    const levelSize = queue.length;\n    const currentLevel: number[] = [];\n\n    for (let i = 0; i < levelSize; i++) {\n      const node = queue.shift()!;\n      currentLevel.push(node.val);\n\n      if (node.left !== null) queue.push(node.left);\n      if (node.right !== null) queue.push(node.right);\n    }\n\n    result.push(currentLevel);\n  }\n\n  return result;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,"21":21,"22":22,"23":23},
    },
    Python: {
      code: "def levelOrder(root: Optional[TreeNode]) -> list[list[int]]:\n    if not root:\n        return []\n\n    queue = collections.deque([root])\n    result = []\n\n    while queue:\n        levelSize = len(queue)\n        currentLevel = []\n\n        for i in range(levelSize):\n            node = queue.popleft()\n            currentLevel.append(node.val)\n\n            if node.left:\n                queue.append(node.left)\n            if node.right:\n                queue.append(node.right)\n\n        result.append(currentLevel)\n\n    return result",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,"21":21,"22":22,"23":23},
    },
    Java: {
      code: "public List<List<Integer>> levelOrder(TreeNode root) {\n    if (root == null) return new ArrayList<>();\n\n    Queue<TreeNode> queue = new LinkedList<>();\n    queue.offer(root);\n    List<List<Integer>> result = new ArrayList<>();\n\n    while (!queue.isEmpty()) {\n        int levelSize = queue.size();\n        List<Integer> currentLevel = new ArrayList<>();\n\n        for (int i = 0; i < levelSize; i++) {\n            TreeNode node = queue.poll();\n            currentLevel.add(node.val);\n\n            if (node.left != null) queue.offer(node.left);\n            if (node.right != null) queue.offer(node.right);\n        }\n\n        result.add(currentLevel);\n    }\n\n    return result;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":13,"13":14,"14":15,"15":16,"16":17,"17":18,"18":19,"19":20,"20":21,"21":22,"22":23,"23":24},
    },
    'C++': {
      code: "vector<vector<int>> levelOrder(TreeNode* root) {\n    if (!root) return {};\n\n    queue<TreeNode*> queue;\n    queue.push(root);\n    vector<vector<int>> result;\n\n    while (!queue.empty()) {\n        int levelSize = queue.size();\n        vector<int> currentLevel;\n\n        for (int i = 0; i < levelSize; i++) {\n            TreeNode* node = queue.front();\n            queue.pop();\n            currentLevel.push_back(node->val);\n\n            if (node->left) queue.push(node->left);\n            if (node->right) queue.push(node->right);\n        }\n\n        result.push_back(currentLevel);\n    }\n\n    return result;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":7,"7":8,"8":9,"9":10,"10":11,"11":12,"12":13,"13":14,"14":15,"15":16,"16":17,"17":18,"18":20,"19":21,"20":22,"21":23,"22":24,"23":25},
    },
  },
  'binary-tree-zigzag-level-order-traversal': {
    JavaScript: {
      code: "function zigzagLevelOrder(root) {\n  if (root === null) return [];\n\n  const queue = [root];\n  const result = [];\n  let leftToRight = true;\n\n  while (queue.length > 0) {\n    const levelSize = queue.length;\n    const currentLevel = [];\n\n    for (let i = 0; i < levelSize; i++) {\n      const node = queue.shift();\n\n      if (leftToRight) {\n        currentLevel.push(node.val);\n      } else {\n        currentLevel.unshift(node.val);\n      }\n\n      if (node.left !== null) queue.push(node.left);\n      if (node.right !== null) queue.push(node.right);\n    }\n\n    result.push(currentLevel);\n    leftToRight = !leftToRight;\n  }\n\n  return result;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,"21":21,"22":22,"23":23,"24":24,"25":25,"26":26,"27":27,"28":28,"29":29,"30":30},
    },
    TypeScript: {
      code: "function zigzagLevelOrder(root: TreeNode | null): number[][] {\n  if (root === null) return [];\n\n  const queue: TreeNode[] = [root];\n  const result: number[][] = [];\n  let leftToRight = true;\n\n  while (queue.length > 0) {\n    const levelSize = queue.length;\n    const currentLevel: number[] = [];\n\n    for (let i = 0; i < levelSize; i++) {\n      const node = queue.shift()!;\n\n      if (leftToRight) {\n        currentLevel.push(node.val);\n      } else {\n        currentLevel.unshift(node.val);\n      }\n\n      if (node.left !== null) queue.push(node.left);\n      if (node.right !== null) queue.push(node.right);\n    }\n\n    result.push(currentLevel);\n    leftToRight = !leftToRight;\n  }\n\n  return result;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,"21":21,"22":22,"23":23,"24":24,"25":25,"26":26,"27":27,"28":28,"29":29,"30":30},
    },
    Python: {
      code: "def zigzagLevelOrder(root: Optional[TreeNode]) -> list[list[int]]:\n    if not root:\n        return []\n\n    queue = collections.deque([root])\n    result = []\n    leftToRight = True\n\n    while queue:\n        levelSize = len(queue)\n        currentLevel = collections.deque()\n\n        for i in range(levelSize):\n            node = queue.popleft()\n\n            if leftToRight:\n                currentLevel.append(node.val)\n            else:\n                currentLevel.appendleft(node.val)\n\n            if node.left:\n                queue.append(node.left)\n            if node.right:\n                queue.append(node.right)\n\n        result.append(list(currentLevel))\n        leftToRight = not leftToRight\n\n    return result",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":15,"17":16,"18":17,"19":18,"20":19,"21":20,"22":21,"23":22,"24":23,"25":24,"26":25,"27":26,"28":27,"29":28,"30":29},
    },
    Java: {
      code: "public List<List<Integer>> zigzagLevelOrder(TreeNode root) {\n    if (root == null) return new ArrayList<>();\n\n    Queue<TreeNode> queue = new LinkedList<>();\n    queue.offer(root);\n    List<List<Integer>> result = new ArrayList<>();\n    boolean leftToRight = true;\n\n    while (!queue.isEmpty()) {\n        int levelSize = queue.size();\n        LinkedList<Integer> currentLevel = new LinkedList<>();\n\n        for (int i = 0; i < levelSize; i++) {\n            TreeNode node = queue.poll();\n\n            if (leftToRight) {\n                currentLevel.addLast(node.val);\n            } else {\n                currentLevel.addFirst(node.val);\n            }\n\n            if (node.left != null) queue.offer(node.left);\n            if (node.right != null) queue.offer(node.right);\n        }\n\n        result.add(currentLevel);\n        leftToRight = !leftToRight;\n    }\n\n    return result;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":16,"16":17,"17":18,"18":19,"19":20,"20":21,"21":22,"22":23,"23":24,"24":25,"25":26,"26":27,"27":28,"28":29,"29":30,"30":31},
    },
    'C++': {
      code: "vector<vector<int>> zigzagLevelOrder(TreeNode* root) {\n    if (!root) return {};\n\n    queue<TreeNode*> queue;\n    queue.push(root);\n    vector<vector<int>> result;\n    bool leftToRight = true;\n\n    while (!queue.empty()) {\n        int levelSize = queue.size();\n        vector<int> currentLevel(levelSize);\n\n        for (int i = 0; i < levelSize; i++) {\n            TreeNode* node = queue.front();\n            queue.pop();\n\n            int index = leftToRight ? i : (levelSize - 1 - i);\n            currentLevel[index] = node->val;\n\n            if (node->left) queue.push(node->left);\n            if (node->right) queue.push(node->right);\n        }\n\n        result.push_back(currentLevel);\n        leftToRight = !leftToRight;\n    }\n\n    return result;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":15,"17":16,"18":17,"19":18,"20":19,"21":20,"22":21,"23":22,"24":23,"25":24,"26":25,"27":26,"28":27,"29":28,"30":29},
    },
  },
  'minimum-absolute-difference-in-bst': {
    JavaScript: {
      code: "function getMinimumDifference(root) {\n  let minDiff = Infinity;\n  let prevVal = null;\n\n  function inorder(node) {\n    if (node === null) return;\n\n    inorder(node.left);\n\n    if (prevVal !== null) {\n      const diff = node.val - prevVal;\n      if (diff < minDiff) {\n        minDiff = diff;\n      }\n    }\n    prevVal = node.val;\n\n    inorder(node.right);\n  }\n\n  inorder(root);\n  return minDiff;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,"21":21,"22":22,"23":23},
    },
    TypeScript: {
      code: "function getMinimumDifference(root: TreeNode | null): number {\n  let minDiff = Infinity;\n  let prevVal: number | null = null;\n\n  function inorder(node: TreeNode | null): void {\n    if (node === null) return;\n\n    inorder(node.left);\n\n    if (prevVal !== null) {\n      const diff = node.val - prevVal;\n      if (diff < minDiff) {\n        minDiff = diff;\n      }\n    }\n    prevVal = node.val;\n\n    inorder(node.right);\n  }\n\n  inorder(root);\n  return minDiff;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,"21":21,"22":22,"23":23},
    },
    Python: {
      code: "def getMinimumDifference(root: Optional[TreeNode]) -> int:\n    minDiff = float('inf')\n    prevVal = None\n\n    def inorder(node: Optional[TreeNode]) -> None:\n        nonlocal minDiff, prevVal\n        if not node:\n            return\n\n        inorder(node.left)\n\n        if prevVal is not None:\n            diff = node.val - prevVal\n            if diff < minDiff:\n                minDiff = diff\n        prevVal = node.val\n\n        inorder(node.right)\n\n    inorder(root)\n    return minDiff",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":5,"7":6,"8":7,"9":8,"10":9,"11":10,"12":11,"13":12,"14":13,"15":14,"16":15,"17":16,"18":16,"19":17,"20":18,"21":19,"22":20,"23":21},
    },
    Java: {
      code: "public int getMinimumDifference(TreeNode root) {\n    int[] minDiff = new int[]{Integer.MAX_VALUE};\n    Integer[] prevVal = new Integer[]{null};\n    inorder(root, minDiff, prevVal);\n    return minDiff[0];\n}\n\nprivate void inorder(TreeNode node, int[] minDiff, Integer[] prevVal) {\n    if (node == null) return;\n\n    inorder(node.left, minDiff, prevVal);\n\n    if (prevVal[0] != null) {\n        int diff = node.val - prevVal[0];\n        if (diff < minDiff[0]) {\n            minDiff[0] = diff;\n        }\n    }\n    prevVal[0] = node.val;\n\n    inorder(node.right, minDiff, prevVal);\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":11,"13":12,"14":13,"15":14,"16":15,"17":16,"18":17,"19":18,"20":19,"21":20,"22":21,"23":22},
    },
    'C++': {
      code: "int getMinimumDifference(TreeNode* root) {\n    int minDiff = INT_MAX;\n    int prevVal = -1;\n    inorder(root, minDiff, prevVal);\n    return minDiff;\n}\n\nvoid inorder(TreeNode* node, int& minDiff, int& prevVal) {\n    if (!node) return;\n\n    inorder(node->left, minDiff, prevVal);\n\n    if (prevVal != -1) {\n        int diff = node->val - prevVal;\n        if (diff < minDiff) {\n            minDiff = diff;\n        }\n    }\n    prevVal = node->val;\n\n    inorder(node->right, minDiff, prevVal);\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":11,"13":12,"14":13,"15":14,"16":15,"17":16,"18":17,"19":18,"20":19,"21":20,"22":21,"23":22},
    },
  },
  'kth-smallest-element-in-a-bst': {
    JavaScript: {
      code: "function kthSmallest(root, k) {\n  let count = 0;\n  let result = null;\n\n  function inorder(node) {\n    if (node === null || result !== null) return;\n\n    inorder(node.left);\n\n    if (result === null) {\n      count++;\n      if (count === k) {\n        result = node.val;\n        return;\n      }\n    }\n\n    inorder(node.right);\n  }\n\n  inorder(root);\n  return result;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,"21":21,"22":22,"23":23},
    },
    TypeScript: {
      code: "function kthSmallest(root: TreeNode | null, k: number): number {\n  let count = 0;\n  let result: number | null = null;\n\n  function inorder(node: TreeNode | null): void {\n    if (node === null || result !== null) return;\n\n    inorder(node.left);\n\n    if (result === null) {\n      count++;\n      if (count === k) {\n        result = node.val;\n        return;\n      }\n    }\n\n    inorder(node.right);\n  }\n\n  inorder(root);\n  return result!;\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"20":20,"21":21,"22":22,"23":23},
    },
    Python: {
      code: "def kthSmallest(root: Optional[TreeNode], k: int) -> int:\n    count = 0\n    result = None\n\n    def inorder(node: Optional[TreeNode]) -> None:\n        nonlocal count, result\n        if not node or result is not None:\n            return\n\n        inorder(node.left)\n\n        if result is None:\n            count += 1\n            if count == k:\n                result = node.val\n                return\n\n        inorder(node.right)\n\n    inorder(root)\n    return result",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":5,"7":6,"8":7,"9":8,"10":9,"11":10,"12":11,"13":12,"14":13,"15":14,"16":15,"17":16,"18":16,"19":17,"20":18,"21":19,"22":20,"23":21},
    },
    Java: {
      code: "public int kthSmallest(TreeNode root, int k) {\n    int[] count = new int[]{0};\n    int[] result = new int[]{-1};\n    inorder(root, k, count, result);\n    return result[0];\n}\n\nprivate void inorder(TreeNode node, int k, int[] count, int[] result) {\n    if (node == null || result[0] != -1) return;\n\n    inorder(node.left, k, count, result);\n\n    if (result[0] == -1) {\n        count[0]++;\n        if (count[0] == k) {\n            result[0] = node.val;\n            return;\n        }\n    }\n\n    inorder(node.right, k, count, result);\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":11,"13":12,"14":13,"15":14,"16":15,"17":16,"18":17,"19":18,"20":19,"21":20,"22":21,"23":22},
    },
    'C++': {
      code: "int kthSmallest(TreeNode* root, int k) {\n    int count = 0;\n    int result = -1;\n    inorder(root, k, count, result);\n    return result;\n}\n\nvoid inorder(TreeNode* node, int k, int& count, int& result) {\n    if (!node || result != -1) return;\n\n    inorder(node->left, k, count, result);\n\n    if (result == -1) {\n        count++;\n        if (count == k) {\n            result = node->val;\n            return;\n        }\n    }\n\n    inorder(node->right, k, count, result);\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":11,"13":12,"14":13,"15":14,"16":15,"17":16,"18":17,"19":18,"20":19,"21":20,"22":21,"23":22},
    },
  },
  'validate-binary-search-tree': {
    JavaScript: {
      code: "function isValidBST(root) {\n  function validate(node, min, max) {\n    if (node === null) return true;\n\n    if (min !== null && node.val <= min) {\n      return false;\n    }\n    if (max !== null && node.val >= max) {\n      return false;\n    }\n\n    return validate(node.left, min, node.val) && validate(node.right, node.val, max);\n  }\n\n  return validate(root, null, null);\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16},
    },
    TypeScript: {
      code: "function isValidBST(root: TreeNode | null): boolean {\n  function validate(node: TreeNode | null, min: number | null, max: number | null): boolean {\n    if (node === null) return true;\n\n    if (min !== null && node.val <= min) {\n      return false;\n    }\n    if (max !== null && node.val >= max) {\n      return false;\n    }\n\n    return validate(node.left, min, node.val) && validate(node.right, node.val, max);\n  }\n\n  return validate(root, null, null);\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16},
    },
    Python: {
      code: "def isValidBST(root: Optional[TreeNode]) -> bool:\n    def validate(node: Optional[TreeNode], min_val: Optional[int], max_val: Optional[int]) -> bool:\n        if not node:\n            return True\n\n        if min_val is not None and node.val <= min_val:\n            return False\n        if max_val is not None and node.val >= max_val:\n            return False\n\n        return validate(node.left, min_val, node.val) and validate(node.right, node.val, max_val)\n\n    return validate(root, None, None)",
      lineMap: {"1":1,"2":2,"3":2,"4":3,"5":4,"6":5,"7":6,"8":7,"9":7,"10":8,"11":9,"12":10,"13":11,"14":11,"15":12,"16":13},
    },
    Java: {
      code: "public boolean isValidBST(TreeNode root) {\n    return validate(root, null, null);\n}\n\nprivate boolean validate(TreeNode node, Long min, Long max) {\n    if (node == null) return true;\n\n    if (min != null && node.val <= min) {\n        return false;\n    }\n    if (max != null && node.val >= max) {\n        return false;\n    }\n\n    return validate(node.left, min, (long) node.val) && validate(node.right, (long) node.val, max);\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16},
    },
    'C++': {
      code: "bool isValidBST(TreeNode* root) {\n    return validate(root, LONG_MIN, LONG_MAX);\n}\n\nbool validate(TreeNode* node, long min, long max) {\n    if (!node) return true;\n\n    if (node->val <= min) {\n        return false;\n    }\n    if (node->val >= max) {\n        return false;\n    }\n\n    return validate(node->left, min, node->val) && validate(node->right, node->val, max);\n}",
      lineMap: {"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16},
    },
  },
};
