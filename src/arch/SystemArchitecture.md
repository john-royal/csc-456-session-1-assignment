Amimul Arnab 

Assignment 8 

Here are the three diagrams for this assignment. 

Component Diagram: 

In this diagram, the web-client (such as a browser) interacts with a local web-server to request data or services. The web-server then communicates with an app-server using a secure protocol, which processes the request and interacts with a Firebase database server to retrieve or store data. Responses are sent back through the same path to the web-client to be displayed to the user.

Path to Component Diagram: ![img](.../src/arch/diagram/image1.png)

Sequence Diagram: 


In this sequence diagram, a user posts a comment through the UI, which sends a request to the backend. The backend then executes a function to create the comment in the database, checks for success or failure, and fetches the comment back. If successful, it confirms to the UI, which then renders the comment to display the addition to the user.

Path to Sequence Diagram: ![img](.../src/arch/diagram/image2.png)

ER Diagram: 

This ER (Entity-Relationship) Diagram represents the data structure of a social application. It includes entities like User, Message, Post, and Comment, with attributes such as username, email, message text, and post content. Relationships between entities are illustrated, showing how, for instance, a Post is connected to User and Comment, indicating that a user can create posts and comments, and a post can have multiple comments. The Message entity, linked to User, suggests that users can send messages to each other, with each message having a sender and receiver. Each entity's attributes suggest the data type stored, like varchar for text, int for numbers, and datetime for timestamps.

The ER Diagram showcases the data model for a social networking application, detailing four main entities: User, Message, Post, and Comment. The primary keys, highlighted in yellow, uniquely identify records within their respective tables and are username for User, message_id for Message, post_id for Post, and comment_id for Comment.

Foreign keys, highlighted in blue, define relationships between these entities, indicating how they interact with one another. For instance, username in Post and Comment ties these entities to the User entity, indicating which user created a post or wrote a comment. Similarly, post_id in the Comment entity references the Post to which the comment belongs. The Message entity contains sender_id and receiver_id as foreign keys that link back to the User entity's username, indicating the sender and receiver of the message.

Path to ER Diagram: ![img](.../src/arch/diagram/image3.png)




