# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:
-dontwarn com.google.mlkit.vision.barcode.Barcode$Address
-dontwarn com.google.mlkit.vision.barcode.Barcode$CalendarDateTime
-dontwarn com.google.mlkit.vision.barcode.Barcode$CalendarEvent
-dontwarn com.google.mlkit.vision.barcode.Barcode$ContactInfo
-dontwarn com.google.mlkit.vision.barcode.Barcode$DriverLicense
-dontwarn com.google.mlkit.vision.barcode.Barcode$Email
-dontwarn com.google.mlkit.vision.barcode.Barcode$GeoPoint
-dontwarn com.google.mlkit.vision.barcode.Barcode$PersonName
-dontwarn com.google.mlkit.vision.barcode.Barcode$Phone
-dontwarn com.google.mlkit.vision.barcode.Barcode$Sms
-dontwarn com.google.mlkit.vision.barcode.Barcode$UrlBookmark
-dontwarn com.google.mlkit.vision.barcode.Barcode$WiFi
-dontwarn com.google.mlkit.vision.barcode.Barcode
-dontwarn com.google.mlkit.vision.common.internal.Detector