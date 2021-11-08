
# What would you change about Human API’s product? 

There are two things I would change: the documentation and the authorization flow. 

## Documentation 

Though I think the documentation overall was one of the better API docs, I think there are some things that could be better that would make it easier for a new developer looking at your docs. 

First. It would be helpful if the documentation were more visual. I mean maybe have more videos, diagrams, code samples of what it would look like to integrate with the api. 

Second: more linear. The dependencies were a little confusing and the documentation would jump around a little but. It made more sense after reading it many times over and over and building something with it. However, it did seem like the docs would jump ahead or behind a little too much leading to some confusion of where the starting point was. Though it was clear you needed the client_id and the client_secret.

I think a possible solution to this would be a step by step guide using a project that the developer can download from git. This project would include a starting template and the finished product, as well as any in-between steps. They can follow along and learn how to integrate it with the project. 


## Authorization flow

This goes hand in hand with the documentation. It was  hard to parse out what exactly needed to happen and when with a new user before and after connecting a resource and for a returning user. How to handle these cases when you have your own list of users. What would be best practice? Again, I think an fully flushed out example project with a DB would be a good solution to this. 



# Where were the primary points of friction during integration?

My primary points of friction came from the same source: Understanding the Authorization flow. I think the diagram provided was confusing: 

![diagram](images/7.png)



I think more linearly. So if the diagram was something like: 

New user > create session_token > HAPI Connected > connect source > first source connect life cycle method called (this is a hypothetical) use this to create access_token for user. 

Existing user > create id_token  + access_token  

Two different paths moving from A -> B -> C. 

This confusion made it hard to know how to implement generating Session_token vs id_token depending on the user’s connection status. All this being said, after implementing the flow, the diagram makes much more sense. Again, maybe having a sample project would help this!  
