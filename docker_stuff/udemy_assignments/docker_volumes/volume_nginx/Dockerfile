FROM nginx:1.24.0-bullseye

#RUN apt-get update 
RUN useradd -ms /bin/bash fastapi 

USER nginx
VOLUME /home/nginx
WORKDIR /home/nginx
CMD ["touch", "foo.txt"]
COPY index.html .

