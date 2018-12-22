//binary search tree visualed using javascript 

var tree; //global tree variable 

function setup(){
    noCanvas();
    tree = new Tree();
    var n = new Node(5);
	tree.addNode(8)
    console.log(tree);
}

function Node(input) {
    this.data = input;
    this.left = null;
    this.right = null;
}

function Tree(){
    this.root = null;
}


Tree.prototype.addValue = function(val){
    var n = new Node(value);
    if (this.root == null){
        this.root = n;
    }
    if(val < ){
       
    }
}