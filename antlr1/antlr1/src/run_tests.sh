#!/bin/zsh
source ~/.zshrc.pre-oh-my-zsh
#echo "running test0.txt"

grun antlr.Expr prog tests/test0.txt -gui & 

#echo "running test1.txt"

#grun antlr.Expr prog tests/test1.txt
#echo "running test2.txt"
#grun antlr.Expr prog tests/test2.txt
