# swooblz-front-end
Swooblz is a chat app that I am going to make. Gave it this name because its funny don't judge me

#Wireframe
https://wireframepro.mockflow.com/editor.jsp?editor=off&publicid=M6b3fff95e838ba1e2449415c98ddd3011556744700411&projectid=M85a64f08fbda8cadd07c3cdc3b1997b11554227725419&perm=Owner#/page/02409c909d89484ea7996a710a073610

#Schema Boilerplate

Users Collection
{
    username: "",
    email: "",
    profilePicture:"",
    phoneBumber:"",
    dateCreated:"",
    friends:[filled with friend objects],
    groups:[filled with group objects],
    id:"",
}
    
    Groups
    {
        name:"",
        dateCreated:"",
        users:Number,
        createdBy:"username",
        messages:[],
        id:"",
    }

    Messages
    {
        createdBy:"",
        dateCreated:"",
        createdById:"userId"
        message:"",
        link:"",
        linkImage:"",
        linkDesc:"",
    }
