FROM node:8.2.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


# Install MongoDB
RUN echo -e "[mongodb]\nname=MongoDB Repository\nbaseurl=https://repo.mongodb.org/yum/redhat/7/mongodb-org/3.2/`uname -m`/\ngpgcheck=0\nenabled=1" > /etc/yum.repos.d/mongodb.repo && \
	yum install -y mongodb-org && \
	yum clean all && \
	chown -R mongod:mongod /var/lib/mongo
# Copy config mongodb
COPY etc/ /etc/
# Mountable directories
VOLUME ["/var/lib/mongo"]
# Set the environment variables
ENV HOME /var/lib/mongo
# Working directory
WORKDIR /var/lib/mongo
ENTRYPOINT ["/bin/mongod"]
CMD ["-f", "/etc/mongod.conf"]


ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
COPY package.json /usr/src/app/
RUN npm set registry http://frontend.tutu.pro && npm install && npm cache clean --force
COPY . /usr/src/app

CMD [ "npm", "start" ]

EXPOSE 3000