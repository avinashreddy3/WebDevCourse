package com.example.icp10;


//    Instead of using the real field name, this method is used to serialize a field with a different name.
import com.google.gson.annotations.SerializedName;

public class User {

    private int id;

    @SerializedName("login")
    private String userName;

//    getting id and username
    public int getId(){
        return id;
    }
    public String getUserName(){
        return userName;
    }
}
