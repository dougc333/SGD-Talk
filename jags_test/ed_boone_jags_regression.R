data <-read.table("sydhob.txt",sep="\t", header=TRUE)
print(data)

model <- lm(data$Time~data$Year)
print(summary(test))
#always put in x and y equals in plot command
plot(y=data$Time, x=data$Year, xlab="Year",ylab="Time",col="green")
abline(a=coef(model)["(Intercept)"],b=coef(model)["data$Year"],col='black')
Time <- transform(data$Time, Fitted = fitted(model))
segments(data$Year, data$Time,data$Year,Time$Fitted)
#internet webpost is inaccurate. big time sink.

x1<-data$Year
y1<-data$Time
n1<-length(x1)

mod<-"model{
  for (i in 1:n1){
     y1[i]~dnorm(mu1[i],tau1)
     mu1[i]<-beta0+beta1*x1[i]
  }
  beta0~dnorm(0,0.00001) 
  beta1~dnorm(0,0.00001) 
  tau1~dgamma(1,1)
  sigma2<-1/tau1
}"

data1<-list("x1","y1","n1")
parm1<-c("beta0","beta1","sigma2")
inits1<-function(){
    list("beta0"=0,"beta1"=0,"tau1"=1)
}
 writeLines(mod,"mod1.jags")
 mod1.jags<-jags(data=data1, inits=inits1, parameters.to.save=parm1,
    n.iter=1000, n.chains=2,model.file="mod1.jags"
 )
 mod1.jags2<-update(mod1.jags,n.iter=500)
traceplot(mod1.jags2
)

mod1.samps<-as.mcmc(mod1.jags2)
chain1<-mod1.samps[[1]]
chain2<-mod1.samps[[2]]
chains1<-data.frame(rbind(chain1,chain2))
b0<-median(chains1$beta0)
b1<-median(chains1$beta1)

plot(x1,y1,col="blue")
lines(x1,b0+b1*x1,col="red")


#version 2!
mod<-"model{
  for (i in 1:n1){
     y1[i]~dnorm(mu1[i],tau1)
     mu1[i]<-beta0+beta1*x1[i]
  }
  beta0~dnorm(0,0.00000000001) 
  beta1~dnorm(0,0.00001) 
  tau1~dgamma(1,1)
  sigma2<-1/tau1
}"

data2<-list("x1","y1","n1")
parm2<-c("beta0","beta1","sigma2")
inits2<-function(){
    list("beta0"=0,"beta1"=0,"tau1"=1)
}
 writeLines(mod,"mod3.jags")
 mod4.jags<-jags(data=data2, inits=inits2, parameters.to.save=parm2,
    n.iter=1000, n.chains=2,model.file="mod3.jags"
 )
mod3.jags2<-update(mod4.jags,n.iter=500)
traceplot(mod3.jags2)

mod1.samps<-as.mcmc(mod3.jags2)
chain1<-mod1.samps[[1]]
chain2<-mod1.samps[[2]]
chains1<-data.frame(rbind(chain1,chain2))
b0<-median(chains1$beta0)
b1<-median(chains1$beta1)

plot(x1,y1,col="blue")
lines(x1,b0+b1*x1,col="green")

#predict range 
x1pred <- 1945:2010

y1pred <- matrix(0, 
                 ncol=length(x1pred),
                 nrow=nrow(chains1))
for (i in 1:nrow(chains1)){
    b0tmp<-chains1$beta0[i]
    b1tmp<-chains1$beta1[i]
    s1tmp<-chains1$sigma2[i]
    e1tmp<-rnorm(length(x1pred),0,
                sqrt(s1tmp))
    y1pred[i,] <- b0tmp+b1tmp*x1pred + e1tmp
}

plot(x1,y1,xlab="year",ylab="time",
     col="blue",
     xlim=c(1945,2010),
     ylim=c(0,10000)
)
lines(x1pred,y1pred[1,],col="red")
lines(x1pred,y1pred[2,],col="purple")

plot(x1,y1,xlab="year",ylab="time",
    "col"="blue", 
    "xlim" = c(1945,2000),
    "ylim" = c(0,10000))

for(i in 1:nrow(y1pred)){
    lines(x1pred,y1pred[i,],col=i)
}

qpred1<-apply(y1pred,2,quantile,c(0.25,0.5,0.975))

plot(x1,y1,col="blue",xlab="Year",ylab="Time",
    xlim=c(1945,2010),ylim=c(0,10000))
lines(x1pred,qpred1[2,],col="orange")
lines(x1pred,qpred1[1,],col="orange",lty=2)
lines(x1pred,qpred1[3,],col="orange",lty=2)
