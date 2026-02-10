from django.shortcuts import render

def home(request):
    data = {
        'name': 'Nikhil'
    }
    return render(request, 'home.html', data)
    