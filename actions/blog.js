var blogEntries = [];
blogEntries.push({
  title: "My Super Entry",
  text: "Lorem ipsum dolor sit amet..."
},
{
  title: "Second entry",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida, nibh quis convallis scelerisque, diam mauris elementum dui, et varius sapien est et turpis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed sed lacus tempus, lacinia dui at, ultricies felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec cursus sapien. Vestibulum eu velit condimentum, lobortis lorem ac, rhoncus metus. Etiam sit amet turpis laoreet magna viverra pulvinar. Nam in nisl facilisis, consectetur tellus a, tristique nunc. In commodo pharetra ullamcorper. Proin libero erat, accumsan nec massa nec, vulputate fringilla libero. Cras consequat ligula vel mattis placerat. Aenean volutpat eros quis tincidunt pretium. Nunc pretium, justo a rhoncus tincidunt, ipsum lectus sagittis libero, vitae auctor lectus nulla varius sem. Morbi mi nunc, condimentum sed dolor ac, pharetra varius urna.."
},
{
  title: "Third Entry",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum laoreet nulla quis luctus eleifend. Cras at lectus vel purus porttitor feugiat a quis sem. Vivamus dictum ut felis eget malesuada. Integer sit amet facilisis nulla, in pretium ligula. Mauris pulvinar venenatis tellus a sodales. Quisque fermentum eget ligula a volutpat. In et gravida eros. Etiam eu sagittis lectus, non mollis magna. Curabitur semper volutpat lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed molestie ultrices dui, a aliquet sem fermentum at. Nullam at nisl vel sem pulvinar euismod. Sed est arcu, venenatis vel lacus rutrum, faucibus euismod sapien. Ut viverra facilisis adipiscing."
},
{
  title: "ABC",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed odio sem, molestie et odio ut, consequat sagittis neque. Donec a tellus et dolor consequat adipiscing. Etiam pretium velit nunc, non hendrerit tortor facilisis eget. In scelerisque ut sapien ac sollicitudin. Fusce sapien dui, tempor sed risus at, sollicitudin varius nisi. Etiam turpis tellus, laoreet ac elementum in, elementum sit amet est. Nullam sed aliquet augue. Integer vestibulum hendrerit molestie."
},
{
  title: "BEF",
  text: "Lorem ipsum dolor sit amet..."
},
{
  title: "AHAHAAH TITLE",
  text: "Lorem ipsum dolor sit amet..."
},
{
  title: "BLA",
  text: "Lorem ipsum dolor sit amet..."
},
{
  title: "BLABLA",
  text: "Lorem ipsum dolor sit amet..."
});
var blogReturnCount = 5;
function isInt(n){
  return typeof n== "number" && isFinite(n) && n%1===0;
}

exports.blogList = {
  name: 'blogList',
  description: 'I will list blog entries',
  inputs: {
    'required' : ["startFrom"],
    'optional' : []
  },
  blockedConnectionTypes: [],
  run: function(api, connection, next) {

    var isValid = true;
    console.log(connection.params.startFrom)
    if(!isInt(connection.params.startFrom) || blogEntries.length <= connection.params.startFrom) {
      isValid = false;
    }

    if(!isValid) {
      connection.error = { Error: "InvalidInput" }
      connection.rawConnection.responseHttpCode = 500;
    } else {
      var hasNext = blogEntries.length > blogReturnCount + connection.params.startFrom;
      var entriesTbReturned = blogEntries.slice(connection.params.startFrom, Math.min(connection.params.startFrom + 5, blogEntries.length - 1))
      connection.response = {
        hasNext: hasNext,
        posts: entriesTbReturned
      }
    }

    // Add some random wait
    var wait = Math.floor(Math.random() * 10)
    var failProb = Math.floor(Math.random() * 5)

    setTimeout(function() {
      // Add some random fail
      if(failProb == 0) {
        connection.response = {};
        connection.error = { Error: "RandomFail" }
        connection.rawConnection.responseHttpCode = 500;
      }
      next(connection, true);    
    }, wait * 250)    
  }
}

exports.blogSave = {
  name: 'blogSave',
  description: 'I will save blog entries',
  inputs: {
    'required' : ["title","text"],
    'optional' : []
  },
  blockedConnectionTypes: [],
  run: function(api, connection, next) {

    var isValid = true;
    if(!connection.params.title || connection.params.title.trim().length == 0) {
      isValid = false
    }
    if(!connection.params.text || connection.params.text.trim().length == 0) {
      isValid = false
    }  

    if(!isValid) {
      connection.error = { Error: "InvalidInput" }
      connection.rawConnection.responseHttpCode = 500;
    } else {
      blogEntries.push({title: connection.params.title, text: connection.params.text });
      connection.response = {
        success: true
      }
    }

    var wait = Math.floor(Math.random() * 10)
    var failProb = Math.floor(Math.random() * 5)

    setTimeout(function() {
      // Add some random fail
      if(failProb == 0) {
        connection.response = {};
        connection.error = { Error: "RandomFail" }
        connection.rawConnection.responseHttpCode = 500;
      }
      next(connection, true);      
    }, wait * 250)
  }
};

