from silence.decorators import endpoint

@endpoint(
    route="/photoCategories/$name",
    method="GET",
    sql="SELECT * FROM photos where photoId in (Select photoId from PhotoCategories WHERE name = $name)",
    description="Returns the photos that have an especific category"
)
def get_by_name():
    pass

###############################################################################

@endpoint(
    #debe incluir el "v2" para que no confunda la ruta con el método get_by_name
    route="/photoCategories/v2/$photoId",
    method="GET",
    sql="SELECT name from photocategories WHERE photoId=$photoId",
    description="Returns the photos that have an especific category"
)

def get_by_photoId():
    pass

###############################################################################

@endpoint(
    route="/photoCategories",
    method="POST",
    sql="INSERT INTO PhotoCategories (photoId, name) VALUES ($photoId, $name)",
    description="Creates a new photoCategory",
    auth_required=True,
)
def create(photoId, name):
    pass

###############################################################################

@endpoint(
    route="/photoCategories/$photoId",
    method="DELETE",
    sql="DELETE FROM photoCategories WHERE photoId = $photoId",
    description="Removes the categories of a photo",
    auth_required=True,
)
def delete_all():
    pass