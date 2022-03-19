//importing all the required packages.
package com.example.basicapp;
//importing the android packages.
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

//inheritance concept complimented using extends keyword
public class SignUpPage extends AppCompatActivity {

    //    overriding the methods of parent class
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up_page);
    }

    //    navigating to logout page
    public void logOut(View v)
    {
        Intent i = new Intent(SignUpPage.this, HomePage.class);
        startActivity(i);
    }
}
