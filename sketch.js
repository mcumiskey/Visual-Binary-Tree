//binary search tree visualed using javascript 

var canvasWidth = 800;
var deltaX = 20;
var deltaY = 20;
var maxDepth = 8;

function setup(){
    
    createCanvas(canvasWidth, 600);
    background(0);
    textAlign(CENTER);
    tree = new Tree();
    tree.addValue(5);
    tree.addValue(2);

    tree.addValue(0);
    tree.addValue(-10);
        tree.addValue(-2);

    tree.addValue(-11);
    tree.addValue(-12);
    tree.addValue(2);
    tree.addValue(6);
    tree.addValue(10);
    tree.addValue(11);
	tree.inorder(tree.root);
    render = new Renderer(40);
    render.createLevels(treeHeight(tree.root));
    render.traverseByRoot(tree.root, width / 2, 25);
    
    console.log(tree);
}

function Node(input) {
    this.data = input;
    this.left = null;
    this.right = null;
    this.xpos = 0;
    this.ypos = 0;
}


// Performs inorder traversal of a tree 
Tree.prototype.inorder = function(node) { 
    if(node !== null) { 
        this.inorder(node.left); //go left
        this.inorder(node.right); //go right
    } 
}

function Tree(){
    this.root = null;
}

function treeHeight(node) {
   if(!node) {
       return 0;
   }
   var leftHeight = treeHeight(node.left);
   var rightHeight = treeHeight(node.right);

   return Math.max(leftHeight, rightHeight) + 1;
}

//creates a new node with a given value
Tree.prototype.addValue = function(val) {
   var newNode = new Node(val); 

   if(this.root == null){					//if there is no root, create one
      this.root = new Node(val, height / 2, width / 2, 0, 0);
   } else {									 //otherwise 
        this.insertNode(this.root, newNode); // find the correct position in the   
   }    								     // tree and add the node
}

//inserts a node when given a root and a new node
Tree.prototype.insertNode = function(node, newNode) {
    
    //if the new data is the same as the node
    //don't add the data
    if(newNode.data === node.data) { 
        return;
    }
    console.log("insertNode node.data: " + node.data + " newNode.data: " + newNode.data);
    newNode.ypos = node.ypos + 1
    
    // if the data is less than the node 
    // data move left of the tree  
    if(newNode.data < node.data) { 
        // if left is null insert node here 
        if (node.left === null) {
            newNode.xpos = node.xpos - maxDepth + newNode.ypos;
            console.log("NewLeft node.data: " + node.data, " node.xpos: " + node.xpos, " newNode.xpos: " + newNode.xpos);
            node.left = newNode; 
            return;
        } else {
            // if left is not null recurr until  
            // null is found 
            console.log("NewLeft cannot insert.  node.left: " + node.left);
            this.insertNode(node.left, newNode);
        }  
    }

    // if the data is more than the node 
    // data move right of the tree  
    else { 
        // if right is null insert node here 
        if(node.right === null) {
            newNode.xpos = node.xpos + 5 - newNode.ypos;
            console.log("NewRight node.data: " + node.data, " node.xpos: " + node.xpos, " newNode.xpos: " + newNode.xpos);
            node.right = newNode; 
            return;
        } else {
            // if right is not null recurr until  
            // null is found 
            this.insertNode(node.right,newNode); 
        }
    } 
}

// search for a node with given data 
Tree.prototype.search = function(node, data) { 
   // if trees is empty return null 
    if(node === null) {
        return null; 
    }
  
    // if data is less than node's data 
    // move left 
    else if(data < node.data) {
        return this.search(node.left, data); 
    }
  
    // if data is less than node's data 
    // move left 
    else if(data > node.data) {
        return this.search(node.right, data); 
    }
  
    // if data is equal to the node data  
    // return node 
    else {
    	return node; 
    }
} 


function Renderer(size){
    this.size = size;    
    this.color = 255;
}

Renderer.prototype.createLevels = function(treeheight){
    var from = color(100, 201, 112);
	var to = color(120, 0, 70);
    var myArray = [from];
    
    var percent = 1 / treeheight;
    
    for(var i = 0; i <= treeheight; i++){
        append(myArray, lerpColor(from, to, percent));
        percent = percent + (percent *.45);
    }
    append(myArray, to);
    
    var x = 0;
    var y = 0;
    
    for(var i = 0; i <= treeheight; i++){
        noStroke();
        fill(myArray[i])
        rect(x, y, width, 50);
        y = y + 50;
    }

}

Renderer.prototype.traverseByRoot = function(node){
    if(node !== null){
        x = (canvasWidth / 2) + (node.xpos * deltaX)
        xRight = x + ((node.xpos - 1) * deltaX)
        xLeft = x - ((node.xpos - 1) * deltaX)
        
        y = 20 + node.xpos * deltaY
        yNew = 30 + y + deltaY
    	console.log("traverseNode data: " + node.data +" xpos: " + node.xpos + " ypos: " + node.ypos);
        
        fill(this.color);
    	ellipse(x, y, this.size);
        stroke(this.color);
        line(x, y, xRight, yNew);
        line(x, y, xLeft, yNew);
        fill(0);
        text(node.data, x, y+4);
        this.traverseByRoot(node.left);
        this.traverseByRoot(node.right);
    } else {
        console.log("I has a null node");
    }
}
