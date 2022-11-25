// Generated from java-escape by ANTLR 4.11.1

    package antlr;
    import org.antlr.v4.runtime.*;
    import java.io.*;
    import java.util.*;
    //import model classes
    import expression.*;


import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast", "CheckReturnValue"})
public class ExprParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.11.1", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, T__1=2, T__2=3, T__3=4, ID=5, NUM=6, INT_TYPE=7, COMMENT=8, WS=9;
	public static final int
		RULE_prog = 0, RULE_decl = 1, RULE_expr = 2;
	private static String[] makeRuleNames() {
		return new String[] {
			"prog", "decl", "expr"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "':'", "'='", "'*'", "'+'", null, null, "'INT'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, null, null, null, null, "ID", "NUM", "INT_TYPE", "COMMENT", "WS"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "java-escape"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }


	  public List<String> vars = new ArrayList<>();
	  public List<String> semanticErrors = new ArrayList<>();
	  public Program program;


	public ExprParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ProgContext extends ParserRuleContext {
		public Program p;
		public DeclContext d;
		public ExprContext e;
		public TerminalNode EOF() { return getToken(ExprParser.EOF, 0); }
		public List<DeclContext> decl() {
			return getRuleContexts(DeclContext.class);
		}
		public DeclContext decl(int i) {
			return getRuleContext(DeclContext.class,i);
		}
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public ProgContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_prog; }
	}

	public final ProgContext prog() throws RecognitionException {
		ProgContext _localctx = new ProgContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_prog);
		 //executed before production takes effect 
		    ((ProgContext)_localctx).p =  new Program();
		    program = _localctx.p;

		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(12); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				setState(12);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,0,_ctx) ) {
				case 1:
					{
					setState(6);
					((ProgContext)_localctx).d = decl();

					          _localctx.p.addExpression(((ProgContext)_localctx).d.d);
					        
					}
					break;
				case 2:
					{
					setState(9);
					((ProgContext)_localctx).e = expr(0);

					          _localctx.p.addExpression(((ProgContext)_localctx).e.e);
					        
					}
					break;
				}
				}
				setState(14); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==ID || _la==NUM );
			setState(16);
			match(EOF);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class DeclContext extends ParserRuleContext {
		public Expression d;
		public Token name;
		public Token type;
		public Token val;
		public TerminalNode ID() { return getToken(ExprParser.ID, 0); }
		public TerminalNode INT_TYPE() { return getToken(ExprParser.INT_TYPE, 0); }
		public TerminalNode NUM() { return getToken(ExprParser.NUM, 0); }
		public DeclContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_decl; }
	}

	public final DeclContext decl() throws RecognitionException {
		DeclContext _localctx = new DeclContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_decl);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(18);
			((DeclContext)_localctx).name = match(ID);
			setState(19);
			match(T__0);
			setState(20);
			((DeclContext)_localctx).type = match(INT_TYPE);
			setState(21);
			match(T__1);
			setState(22);
			((DeclContext)_localctx).val = match(NUM);


			    int line = ((DeclContext)_localctx).name.getLine();
			    int column = ((DeclContext)_localctx).name.getCharPositionInLine()+1;
			    String id = (((DeclContext)_localctx).name!=null?((DeclContext)_localctx).name.getText():null);
			    if (vars.contains(id)){
			        semanticErrors.add("Error variable:"+id+" already declared "+line+" column:"+column);
			    }else{
			        vars.add(id);
			    }
			    String type = ((DeclContext)_localctx).type.getText();
			    int val = (((DeclContext)_localctx).val!=null?Integer.valueOf(((DeclContext)_localctx).val.getText()):0);
			    ((DeclContext)_localctx).d =  new VariableDeclaration(id,type,val );

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ExprContext extends ParserRuleContext {
		public Expression e;
		public ExprContext left;
		public Token id;
		public Token n;
		public ExprContext right;
		public TerminalNode ID() { return getToken(ExprParser.ID, 0); }
		public TerminalNode NUM() { return getToken(ExprParser.NUM, 0); }
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public ExprContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expr; }
	}

	public final ExprContext expr() throws RecognitionException {
		return expr(0);
	}

	private ExprContext expr(int _p) throws RecognitionException {
		ParserRuleContext _parentctx = _ctx;
		int _parentState = getState();
		ExprContext _localctx = new ExprContext(_ctx, _parentState);
		ExprContext _prevctx = _localctx;
		int _startState = 4;
		enterRecursionRule(_localctx, 4, RULE_expr, _p);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(30);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ID:
				{
				setState(26);
				((ExprContext)_localctx).id = match(ID);

				        int line = ((ExprContext)_localctx).id.getLine();
				        int column = ((ExprContext)_localctx).id.getCharPositionInLine() + 1;
				        if (!vars.contains((((ExprContext)_localctx).id!=null?((ExprContext)_localctx).id.getText():null))){
				            semanticErrors.add("Error variable:"+(((ExprContext)_localctx).id!=null?((ExprContext)_localctx).id.getText():null)+" not declared at line:"+line+ " column:"+column);
				        }
				        ((ExprContext)_localctx).e =  new Variable((((ExprContext)_localctx).id!=null?((ExprContext)_localctx).id.getText():null));
				    
				}
				break;
			case NUM:
				{
				setState(28);
				((ExprContext)_localctx).n = match(NUM);

				        ((ExprContext)_localctx).e =  new expression.Number((((ExprContext)_localctx).n!=null?Integer.valueOf(((ExprContext)_localctx).n.getText()):0));
				    
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			_ctx.stop = _input.LT(-1);
			setState(44);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,4,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					setState(42);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,3,_ctx) ) {
					case 1:
						{
						_localctx = new ExprContext(_parentctx, _parentState);
						_localctx.left = _prevctx;
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(32);
						if (!(precpred(_ctx, 4))) throw new FailedPredicateException(this, "precpred(_ctx, 4)");
						setState(33);
						match(T__2);
						setState(34);
						((ExprContext)_localctx).right = expr(5);

						                  ((ExprContext)_localctx).e =  new Multiplication(((ExprContext)_localctx).left.e, ((ExprContext)_localctx).right.e);
						              
						}
						break;
					case 2:
						{
						_localctx = new ExprContext(_parentctx, _parentState);
						_localctx.left = _prevctx;
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(37);
						if (!(precpred(_ctx, 3))) throw new FailedPredicateException(this, "precpred(_ctx, 3)");
						setState(38);
						match(T__3);
						setState(39);
						((ExprContext)_localctx).right = expr(4);

						                  ((ExprContext)_localctx).e =  new Addition(((ExprContext)_localctx).left.e, ((ExprContext)_localctx).right.e);
						              
						}
						break;
					}
					} 
				}
				setState(46);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,4,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public boolean sempred(RuleContext _localctx, int ruleIndex, int predIndex) {
		switch (ruleIndex) {
		case 2:
			return expr_sempred((ExprContext)_localctx, predIndex);
		}
		return true;
	}
	private boolean expr_sempred(ExprContext _localctx, int predIndex) {
		switch (predIndex) {
		case 0:
			return precpred(_ctx, 4);
		case 1:
			return precpred(_ctx, 3);
		}
		return true;
	}

	public static final String _serializedATN =
		"\u0004\u0001\t0\u0002\u0000\u0007\u0000\u0002\u0001\u0007\u0001\u0002"+
		"\u0002\u0007\u0002\u0001\u0000\u0001\u0000\u0001\u0000\u0001\u0000\u0001"+
		"\u0000\u0001\u0000\u0004\u0000\r\b\u0000\u000b\u0000\f\u0000\u000e\u0001"+
		"\u0000\u0001\u0000\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001"+
		"\u0001\u0001\u0001\u0001\u0001\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0003\u0002\u001f\b\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0005\u0002+\b\u0002\n\u0002\f\u0002.\t\u0002\u0001"+
		"\u0002\u0000\u0001\u0004\u0003\u0000\u0002\u0004\u0000\u00001\u0000\f"+
		"\u0001\u0000\u0000\u0000\u0002\u0012\u0001\u0000\u0000\u0000\u0004\u001e"+
		"\u0001\u0000\u0000\u0000\u0006\u0007\u0003\u0002\u0001\u0000\u0007\b\u0006"+
		"\u0000\uffff\uffff\u0000\b\r\u0001\u0000\u0000\u0000\t\n\u0003\u0004\u0002"+
		"\u0000\n\u000b\u0006\u0000\uffff\uffff\u0000\u000b\r\u0001\u0000\u0000"+
		"\u0000\f\u0006\u0001\u0000\u0000\u0000\f\t\u0001\u0000\u0000\u0000\r\u000e"+
		"\u0001\u0000\u0000\u0000\u000e\f\u0001\u0000\u0000\u0000\u000e\u000f\u0001"+
		"\u0000\u0000\u0000\u000f\u0010\u0001\u0000\u0000\u0000\u0010\u0011\u0005"+
		"\u0000\u0000\u0001\u0011\u0001\u0001\u0000\u0000\u0000\u0012\u0013\u0005"+
		"\u0005\u0000\u0000\u0013\u0014\u0005\u0001\u0000\u0000\u0014\u0015\u0005"+
		"\u0007\u0000\u0000\u0015\u0016\u0005\u0002\u0000\u0000\u0016\u0017\u0005"+
		"\u0006\u0000\u0000\u0017\u0018\u0006\u0001\uffff\uffff\u0000\u0018\u0003"+
		"\u0001\u0000\u0000\u0000\u0019\u001a\u0006\u0002\uffff\uffff\u0000\u001a"+
		"\u001b\u0005\u0005\u0000\u0000\u001b\u001f\u0006\u0002\uffff\uffff\u0000"+
		"\u001c\u001d\u0005\u0006\u0000\u0000\u001d\u001f\u0006\u0002\uffff\uffff"+
		"\u0000\u001e\u0019\u0001\u0000\u0000\u0000\u001e\u001c\u0001\u0000\u0000"+
		"\u0000\u001f,\u0001\u0000\u0000\u0000 !\n\u0004\u0000\u0000!\"\u0005\u0003"+
		"\u0000\u0000\"#\u0003\u0004\u0002\u0005#$\u0006\u0002\uffff\uffff\u0000"+
		"$+\u0001\u0000\u0000\u0000%&\n\u0003\u0000\u0000&\'\u0005\u0004\u0000"+
		"\u0000\'(\u0003\u0004\u0002\u0004()\u0006\u0002\uffff\uffff\u0000)+\u0001"+
		"\u0000\u0000\u0000* \u0001\u0000\u0000\u0000*%\u0001\u0000\u0000\u0000"+
		"+.\u0001\u0000\u0000\u0000,*\u0001\u0000\u0000\u0000,-\u0001\u0000\u0000"+
		"\u0000-\u0005\u0001\u0000\u0000\u0000.,\u0001\u0000\u0000\u0000\u0005"+
		"\f\u000e\u001e*,";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}