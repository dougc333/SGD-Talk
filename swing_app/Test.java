import javax.swing.*;  
import static javax.swing.JOptionPane.showMessageDialog;
import java.awt.*;
import java.awt.event.*;


class Test{

    
    public static void main(String []args){
        JFrame f = new JFrame("test");
        JButton b = new JButton("clickme");
        b.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e){
                System.out.println("actiion here");
                showMessageDialog(null,"button clicked");
            } 
        });
        
        System.out.println("this doesnt always work depending on thread ");
        b.setBounds(130,100,100,40);
        f.add(b);
        f.setSize(500,500);
        f.setLayout(null);
        f.setVisible(true);
    }
}