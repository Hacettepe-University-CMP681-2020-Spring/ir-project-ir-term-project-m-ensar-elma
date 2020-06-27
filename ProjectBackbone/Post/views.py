from django.shortcuts import render, HttpResponse, get_object_or_404
from django.http import JsonResponse
from Post.models import Post
from django.core import serializers
from django.http.response import JsonResponse
from django.db.models import Q
import json

import requests

import numpy as np

# Create your views here.

def healtcheck(request):
    return HttpResponse('{name:"ensar"}')


def searchit(request):
    queryDocument = request.GET.get('query')
    queryDocument=queryDocument.split(' ')
    query = Q()
    for entry in queryDocument:
        query = query | Q(title__contains=entry)


    result = Post.objects.filter(query)
    serialized_queryset = serializers.serialize('python', result)
    return JsonResponse(serialized_queryset, safe=False)
    #return JsonResponse(queryDocument, safe=False)

def getall(request):
    queryDocument = request.GET.get('query')
    result = Post.objects.all()
    serialized_queryset = serializers.serialize('python', result)
    return JsonResponse(serialized_queryset, safe=False)


def bert(request):
    passage = request.GET.get('passage')
    question = request.GET.get('question')
    url="http://127.0.0.1:8001/predict"
    jsonsend = {
        "document": passage,
        "question":question}
    print("until good")
    response=requests.post(url, json=jsonsend)

    return HttpResponse(response)

def retriever(request):
    question = request.GET.get('query')
    url="http://127.0.0.1:8002/retrieve"
    jsonsend = {
        "query":question}
    print("take wuery redireck retriever")
    response=requests.post(url, json=jsonsend)

    return HttpResponse(response)

def bertautomata(request):
    result = Post.objects.all()
    for entry in result:

        url="http://127.0.0.1:8001/predict"
        jsonsend = {
            "document": entry.content,
            "question":entry.title}

        response=requests.post(url, json=jsonsend)
        jsonresult = json.loads(response.text)
        conf=jsonresult['result']['confidence']
        answer=jsonresult['result']['answer']
        entry.bertanswer=answer
        entry.bertconf=conf
        entry.save()
        print("until good")
    return HttpResponse(response)