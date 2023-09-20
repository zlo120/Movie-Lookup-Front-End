# React application
This react application utilises API calls to a back end server for querying a database.

# Purpose
This application allows users to query movies through the search functionality. Users are also able to register an account and in doing so unlocks some added features that are inaccessible to non registered users. 

# User registration and JWT
Once a user has registered an account and signed in, the back end generates a JWT for the user on the front end to be able to access additional information about an actor.

# Infinite scrolling
When a user searches for a movie, if the search results exceed 100 movies, the user will be able to infinitely scroll the paginated results until they reach the end.