FROM python:3.10-bullseye

# install nsjail
RUN apt-get -y update
RUN apt-get install -y \
    autoconf \
    bison \
    flex \
    gcc \
    g++ \
    git \
    libprotobuf-dev \
    libnl-route-3-dev \
    libtool \
    make \
    pkg-config \
    protobuf-compiler \
    && rm -rf /var/lib/apt/lists/*
COPY ./lib/nsjail /nsjail
RUN cd /nsjail && make && mv /nsjail/nsjail /bin && rm -rf -- /nsjail

RUN mkdir /judge

# run the judge
WORKDIR /usr/src/app
COPY ./src /usr/src/app
CMD ["/usr/local/bin/python3.10", "main.py"]
