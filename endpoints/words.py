from silence.decorators import endpoint

@endpoint(
    route="/words",
    method="GET",
    sql="SELECT * FROM Words"
)
def get_all():
    pass

###############################################################################
