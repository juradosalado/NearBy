from silence.decorators import endpoint

@endpoint(
    route="/comments/$photoId",
    method="GET",
    sql="SELECT * FROM Comments WHERE photoId = $photoId"
)
def get_by_photoId():
    pass

###############################################################################

@endpoint(
    route="/comments",
    method="POST",
    sql="INSERT INTO Comments (text, userId, photoId) VALUES ($text, $userId, $photoId)",
    description="Creates a new comment",
    auth_required=True,
)
def create(text, userId, photoId):
    pass

###############################################################################
