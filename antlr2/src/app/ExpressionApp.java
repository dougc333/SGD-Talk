package app;

import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.CharStreams;

import antlr.ExprParser;
import expression.ExpressionProcessor;
import expression.MyErrorListener;
import antlr.ExprLexer;
import org.antlr.v4.runtime.CommonTokenStream;
import expression.Program;
public class ExpressionApp {    
    public static void main(String args[]){
        if(args.length!=1){
            System.err.println("Usage:fileName");
        }else{
            String fileName = args[0];
            ExprParser parser = getParser(fileName);
            parser.prog();
            // if no syntax error
            if(MyErrorListener.hasError){
                // report error to std err
            }else{
                Program prog = parser.program;
                if (parser.semanticErrors.isEmpty()){
                    ExpressionProcessor ep = new ExpressionProcessor(prog.expressions);
                    for(String evaluation:ep.getEvaluationResults()){
                        System.out.println(evaluation);
                    }
                }else{
                    for(String err:parser.semanticErrors){
                        System.out.println(err);
                    }
                }
            }
        }
    }

    private static ExprParser getParser(String fileName){
        ExprParser parser = null;

        try {
            System.out.println("fileName:"+fileName);
            CharStream input = CharStreams.fromFileName(fileName);
            ExprLexer lexer = new ExprLexer(input);
            CommonTokenStream tokens = new CommonTokenStream(lexer);
            parser = new ExprParser(tokens);
            //syntax error handling
            parser.removeErrorListeners();
            parser.addErrorListener(new MyErrorListener());
            //

        } catch (Exception e) {            // TODO: handle exception
            e.printStackTrace();
        }
        return parser;
    }
}
