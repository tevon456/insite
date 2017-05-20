FROM python:3.6
MAINTAINER Mardon Bailey <mardon_workspace@hotmail.com>
WORKDIR /garnet
ADD . /garnet
RUN pip3 install -r requirements.txt
EXPOSE 6000


CMD bash run.sh