grammar Expr;

/* the grammar name and file name must match */

@header{
    package antlr;
}

//start symbol
prog: (decl|expr)+EOF   # Program
    ;

decl: ID ':' INT_TYPE '=' NUM  # Declaration
    ;
/* antlr resolves ambiguous teh first rule takes precedence */
expr: expr '*' expr # Multiplication
    | expr '+' expr # Addition
    | ID            # Variable
    | NUM           # Number
    ;

ID: [a-z][a-zA-Z0-9_]*;
NUM: '0' | '-'?[1-9][0-9]*;
INT_TYPE : 'INT';
COMMENT : '--' ~[\r\n]* -> skip;
WS : [ \t\n]+ -> skip;