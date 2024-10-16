** Document your bugs here **

- BUG #1: no json schemas being used, this leaves the door open for many untested outcomes.

- BUG #2: Added admin to the req.body in the testing files.

-BUG #3: replaced beforeEach with beforeAll, in routes.test.js

- BUG #4: added await keyword to line 66 in routes/auth.js

-BUG #5: Error was not being thrown in line 120 of models/user.js

-BUG #6: Patching is only allowed for admins, or users that want to edit their own account info.
