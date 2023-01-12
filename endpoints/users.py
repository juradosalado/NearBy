from silence.decorators import endpoint

@endpoint(
    route="/users",
    method="GET",
    sql="SELECT * FROM Users"
)
def get_all():
    pass

###############################################################################

@endpoint(
    route="/users/$userId",
    method="GET",
    sql="SELECT * FROM Users WHERE userId = $userId"
)
def get_by_id():
    pass

###############################################################################

@endpoint(
    route="/users/$userId",
    method="PUT",
    sql="UPDATE Users SET firstName = $firstName, lastName = $lastName, telephone = $telephone, email = $email, username = $username, avatarUrl = $avatarUrl WHERE userId = $userId",
    description="Edit an existing profile",
    auth_required=True,
)
def update(firstName, lastName, telephone, email, username, avatarUrl):
    pass
