from silence.decorators import endpoint

@endpoint(
    route="/ratings",
    method="GET",
    sql="SELECT * FROM Ratings"
)
def get_all():
    pass

###############################################################################

@endpoint(
    route="/ratings/$photoId",
    method="GET",
    sql="SELECT * FROM Ratings WHERE photoId = $photoId"
)
def get_by_photoId():
    pass


###############################################################################

@endpoint(
    route="/ratings/$photoId/$userId",
    method="GET",
    sql="SELECT * FROM Ratings WHERE photoId = $photoId AND userId = $userId"
)
def get_by_photoUserId():
    pass

###############################################################################

@endpoint(
    route="/ratings",
    method="POST",
    sql="INSERT INTO Ratings (rate, userId, photoId) VALUES ($rate, $userId, $photoId)",
    description="Creates a new rate",
    auth_required=True,
)
def create(rate, userId, photoId):
    pass

###############################################################################
