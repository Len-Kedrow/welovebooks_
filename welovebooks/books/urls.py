from django.urls import path
from .views import BookSearch, StoreBookView, ToReadList, AllBooks, RemoveBook

urlpatterns = [
    path("book-search/", BookSearch.as_view(), name ='book-search'),
    path('keep-books/', StoreBookView.as_view(), name='keep-books'),
    path('all-books/', AllBooks.as_view(), name='all-books'), 
    path('remove-book', RemoveBook.as_view(), name='remove-book')
    # # api/lists/:list_id
    # path("<int:item_id>/", An_item.as_view(), name = 'an_item'),
    
    # path('category/<str:item_category>/', ItemsByCategory.as_view(), name = 'items_by_category'),
    
]
