from ast import Str
import datetime
import json
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.db.models import Count, Max
from orders.models import Foods, Orders
from django.db import connection
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
from uuid import uuid4

# Create your views here.
def index(request):
    return render(request, 'index.html')

def summery(request):
    return render(request, 'summery.html')

def handle_foods(request):
    query = Foods.objects.all()
    return HttpResponse(
        serializers.serialize("json", query),
        content_type="application/json"
    )

@csrf_exempt
def handle_orders(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        if body.get("main_dish", None) == None or body.get("side_dishes", None) == None:
            return JsonResponse({"result": "invalid"})
        else:
            if len(body["side_dishes"]) < 1:
                return JsonResponse({"result": "invalid"})
            else:
                main_dish = body["main_dish"]
                side_dishes = body["side_dishes"]
                desserts = body["desserts"]

                key = uuid4().hex
                
                date = Str(datetime.date.today)
                # Saving the main dish first
                main_dish_result = Orders.objects.create(order_id=key, name=main_dish["name"], type="main_dish", price=main_dish["price"], food=main_dish["id"])
                print(main_dish_result.id)

                for item in side_dishes:
                    Orders.objects.create(order_id=key, name=item["name"], type="side_dish", price=item["price"], food=item["id"])

                for item in desserts:
                    Orders.objects.create(order_id=key, name=item["name"], type="dessert", price=item["price"], food=item["id"])
                return JsonResponse({"status": "success"})

    elif request.method == 'GET':
        body = json.loads(request.body)
        print(body)
        if body.get("date", None) != None:
            query = Orders.objects.all().filter(created_at=body["date"])
            response_json = serializers.serialize("json", query)
            return HttpResponse(response_json, content_type="application/json")
        else:
            return JsonResponse({"result": "invalid"})

@csrf_exempt
def get_order_table(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        print(body)
        if body.get("date", None) != None:
            query = Orders.objects.all().filter(created_at=body["date"])
            response_json = serializers.serialize("json", query)
            return HttpResponse(response_json, content_type="application/json")
        else:
            return JsonResponse({"result": "invalid"})
    else:
        return JsonResponse({"result": "invalid"})

def famous_main_dish(request):
    query = Orders.objects.all().values('name').filter(type="main_dish").annotate(total=Count('name')).order_by('-total')
    if len(query) >= 1:
        return JsonResponse({"result": query[0]})
    else:
        return JsonResponse({"result": "empty"})

def famous_side_dish(request):
    query = Orders.objects.all().values('name').filter(type="side_dish").annotate(total=Count('name')).order_by('-total')
    if len(query) >= 1:
        return JsonResponse({"result": query[0]})
    else:
        return JsonResponse({"result": "empty"})