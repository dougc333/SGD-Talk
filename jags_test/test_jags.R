set.seed(42) # Set a random seed for reproducibility of the simulation

samplesize <- 30 # Number of data points

b_length <- sort(rnorm(samplesize)) # Body length (explanatory variable)

int_true <- 30 # True intercept
slope_true <- 10 # True slope
mu <- int_true + slope_true * b_length # True means of normal distributions
sigma <- 5 # True standard deviation of normal distributions

b_mass <- rnorm(samplesize, mean = mu, sd = sigma) # Body mass (response variable)

snakes1 <- data.frame(b_length = b_length, b_mass = b_mass)
print(snakes1)
library(R2jags)
jagsdata_s1 <- with(snakes1, list(b_mass = b_mass, b_length = b_length, N = length(b_mass)))


lm1_jags <- function(){
	# Likelihood:
	for (i in 1:N){
		b_mass[i] ~ dnorm(mu[i], tau) # tau is precision (1 / variance)
		mu[i] <- alpha + beta * b_length[i]
	}
	# Priors:
	alpha ~ dnorm(0, 0.01) # intercept
	beta ~ dnorm(0, 0.01) # slope
	sigma ~ dunif(0, 100) # standard deviation
	tau <- 1 / (sigma * sigma) # sigma^2 doesn't work in JAGS
}

init_values <- function(){
	list(alpha = rnorm(1), beta = rnorm(1), sigma = runif(1))
}

params <- c("alpha", "beta", "sigma")

fit_lm1 <- jags(data = jagsdata_s1, inits = init_values, parameters.to.save = params, model.file = lm1_jags,
			   n.chains = 3, n.iter = 12000, n.burnin = 2000, n.thin = 10, DIC = F)
print("---------")
print(fit_lm1)

traceplot(fit_lm1, mfrow = c(2, 2), ask = F)
plot(fit_lm1)

lm1_mcmc <- as.mcmc(fit_lm1)
plot(lm1_mcmc)