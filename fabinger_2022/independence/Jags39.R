#################################################
#
# Basic R to Jags code
#
#################################################
version
install.packages("rjags")
library("rjags")
# Dataset 1
x1 <- c( 125.2, 131.1, 121.5, 122.3, 119.3,
         123.5, 130.2, 122.9, 129.2, 127.1 )

# Dataset 2
x2 <- c( 118.6, 122.2, 110.5, 118.8,
         115.9, 116.5, 114.5, 118.0,
         113.2, 119.0, 117.7, 116.7 )

# Get the sample sizes
n1 <- length( x1 )
n2 <- length( x2 )

##############################################
# Write the model

mod1 <- "model{
  # Sample from population 1
  for( i in 1:n1 ){
    x1[i] ~ dnorm( mu1, sig1 )
  }
  # Sample from population 2
  for( i in 1:n2 ){
    x2[i] ~ dnorm( mu2, sig2 )
  }
  # Create the difference
  mudiff1 <- mu1 - mu2
  # Prior information
  mu1 ~ dnorm( 120, 1/100 )
  sig1 ~ dgamma( 1, 1 )
  mu2 ~ dnorm( 120, 1/100 )
  sig2 ~ dgamma( 1, 1 )
  }"

# Write the model out to a file for later
writeLines( mod1, "mod1.jags" )

# Set up the data for Jags
data1 <- list( "x1", "n1", "x2", "n2" )

# List the parameters we want to save
parm1 <- c( "mu1", "sig1", "mu2", "sig2", "mudiff1" )

# Create a set of initial values to start at
inits1 <- function(){
  list( "mu1"=1, "sig1"=1, "mu2"=1, "sig2"=1)
}

# Run the jags model
mod1.jags <- jags( data = data1,
                   inits = inits1,
                   parameters.to.save = parm1,
                   n.iter = 1000,
                   n.chains = 2,
                   model.file = "mod1.jags" )

# update the samples
mod1.jags2 <- update( mod1.jags, n.iter = 5000 )

# Plot the samples
# plot( mod1.jags )
traceplot( mod1.jags )

# Get the samples
mod1.samps <- as.mcmc( mod1.jags2 )

# Get the samples we want
chain1 <- mod1.samps[[1]]
chain2 <- mod1.samps[[2]]

# Combine them together
chains1 <- rbind( chain1, chain2 )

# Analyze the samples
quantile( chains1[,2], c( 0.025, 0.5, 0.975 ))
quantile( chains1[,3], c( 0.025, 0.5, 0.975 ))
quantile( chains1[,4], c( 0.025, 0.5, 0.975 ))
quantile( chains1[,5], c( 0.025, 0.5, 0.975 ))
quantile( chains1[,6], c( 0.025, 0.5, 0.975 ))

# Create a plot of the posterior density
plot( density( chains1[,2] ), type = "l" )
plot( density( chains1[,3] ), type = "l" )
plot( density( chains1[,4] ), type = "l" )
plot( density( chains1[,5] ), type = "l" )
plot( density( chains1[,6] ), type = "l" )


