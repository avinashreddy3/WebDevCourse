package com.example.icp11;

import static android.text.TextUtils.isEmpty;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import java.util.Locale;

public class MainActivity extends AppCompatActivity {

//    created the following variables for the functionalities
    EditText editText;
    Button btn;
    TextToSpeech tts;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

//        calling the variables by ID's
        editText= findViewById(R.id.editTextTTS);
        btn= findViewById(R.id.btnTTS);

        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                tts= new TextToSpeech(MainActivity.this, new TextToSpeech.OnInitListener() {
                    @Override
                    public void onInit(int status) {
                        if (status== TextToSpeech.SUCCESS){
//                          verifying the location
                            int result= tts.setLanguage(Locale.US);
//                            validation the text entered
                            if (result== TextToSpeech.LANG_NOT_SUPPORTED || result== TextToSpeech.LANG_MISSING_DATA){
                                Log.e("message", "Language is not supported");
                            }else {
                                speak();
                            }
                        }else {
                            Log.e("message", "TTs is not supported");
                        } }
                });
            }
        });
    }

//    main functionality triggered when clicked on speak button
    void speak() {
        String s = String.valueOf(editText.getText());
        tts.setSpeechRate(0.1f);
//        displaying the message if no text is entered
        if (isEmpty(s)){
            tts.speak("please enter something to speak", TextToSpeech.QUEUE_ADD, null);
        }else{
            tts.speak(s, TextToSpeech.QUEUE_ADD, null);
        }
    }

//    for interruption
    @Override
    protected void onDestroy(){
        super.onDestroy();
        tts.stop();
        tts.shutdown();
    }
}