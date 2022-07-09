st<-c(19.5, 24.7, 30.7, 29.8, 19.1, 25.6, 31.4, 27.9, 22.1, 25.5, 31.1,
      30.4, 18.7, 19.7, 14.6, 29.5, 27.7, 30.2, 22.7, 25.2)
tc<-c(43.1, 49.8, 51.9, 54.3, 42.2, 53.9, 58.5, 52.1, 49.9, 53.5, 56.6,
      56.7, 46.5, 44.2, 42.7, 54.4, 55.3, 58.6, 48.2, 51.0)
mc<-c(29.1, 28.2, 37.0, 31.1, 30.9, 23.7, 27.6, 30.6, 23.2, 24.8, 30.0,
      28.3, 23.0, 28.6, 21.3, 30.1, 25.7, 24.6, 27.1, 27.5)
bf<-c(11.9, 22.8, 18.7, 20.1, 12.9, 21.7, 27.1, 25.4, 21.3,
      19.3, 25.4, 27.2, 11.7, 17.8, 12.8, 23.9, 22.6, 25.4, 14.8,
      21.1)
st_tc <- st*tc
st_mc <- st*mc
tc_mc <- tc*mc
st_tc_mc <- st*tc*mc
fat <- data.frame(st, tc, mc, st_tc, st_mc, tc_mc, st_tc_mc, bf)
fat
summary(fat)
pairs(fat)
cor(fat)
#a correlation >.7 is strong, <0.2 is weak, 0.2-0.4 is moderate, >0.4 is strong correlation
#is this a pearson correlation coefficient? A single number is calculated how? the slope of the interaction normalized to 1? 
#if you plot both variables you can see a positive or negative slope.

#st_tc, st_mc, tc_mc, st_tc_mc all >0.7 with all other feature vars. 
#mc to tc not so bad, .08. in general the st,tc,mc correlation not so string but the 
#combination of st,tc,mc is very high. What does this mean? 

#trick: remove mean from values, what does this do? Centers values around mean. How does this help? 
st.c <- st - mean(st)
tc.c <- tc - mean(tc)
mc.c <- mc - mean(mc)


st_tc.c <- st.c*tc.c
st_mc.c <- st.c*mc.c
tc_mc.c <- tc.c*mc.c
st_tc_mc.c <- st.c*tc.c*mc.c

#redo with these centered values

fat.c <- data.frame(st.c, tc.c, mc.c, st_tc.c, st_mc.c, tc_mc.c, st_tc_mc.c, bf)
cor(fat.c)



#not clear why this works. If this workd for multiple dims. This is simple real valued data
#combination of categorical and real? 
#
