# junior-dev-challenge

## The ​'Scenario'

Part of Cordant Group's business is to provide their Clients with workers.<br>
To decide which workers (or 'Candidates') are most suitable to send to the Client, we consider a number of factors e.g. a Candidate's time and distance to travel to the Client's location.

You will be provided with two tables containing the following data:

- Clients:

  - Name
  - Postcode

- Candidates:

  - Name
  - Postcode
  - Mode of Transport {{optional}}

    - type
    - speed (km/h)

When Betty​ accesses the page, she wants to be able to select a Client​.<br>
When she selects a Client​ she wants to be able to see which Candidate​ is closest to the Client's​ location.<br>
When displaying the Candidate​ it should show the time and distance to travel to the Client​ based on various modes of travel.

## The Solution Spec

Your solution must make use of at least one external API.

Consider using:

- Postcodes.io
- Google Maps
- Materialize.css

... or any other.<br>
(Be careful not to exceed your API request limit!)

Please provide a brief description of your thinking and process and if you write something you are particularly proud of or struggled with, note this as well (either in the README or comment your code).<br>
Maintain a list of sources if you copy code from forums, it's okay to do it, we just want to see how you change someone else's code to make it work for you.<br>
You may choose to do this purely in the front end but you could also consider building a database to store the data and a back end to serve it.

## Optional Extras

If you are happy you have met the specification and have provided a solution to Betty's problem and you still have time to spare :

- Default the mode of transport to the one specified on the Candidate's​ record, if provided
- Consider adding test cases
- Add additional functionality
- Expand on the user interface
