<?php

namespace App\Http\Controllers\Tool;

use App\Http\Controllers\Controller;
use QrCode, Response;

/**
 * Class Tool
 * @package App\Http\Controllers\Tool
 */
class Tool extends Controller
{
    public static function qrcode($mid){
        $size = 780-447;
        $offset_x = 205;
        $offset_y = 447;
        $path = 'uploads/qrcode/qrcode'.$mid.'.png'; //存二维码
        QrCode::format('png')->size($size)->margin(1)->generate(config('custom.BasePath').'/platform/index?id='.$mid,public_path('/'.$path)); // 生成二维码
        $dituPath = 'uploads/qrcode/ditu.png'; // 底图路径
        $img = imagecreatefromstring(file_get_contents($path));//合成
        $dituImg = imagecreatefromstring(file_get_contents($dituPath));
        list($width, $hight, $type) = getimagesize($path);
        list($dituWidth, $dituHight, $dituType) = getimagesize($dituPath);
        header("Content-type:image/png");
        imagepng($dituImg,'uploads/qrcode/qrcodeRes'.$mid.'.png');
        $midPath = 'uploads/qrcode/qrcodeRes'.$mid.'.png';
        $imgMid = imagecreatefromstring(file_get_contents($midPath));
        list($midWidth, $midHight, $midType) = getimagesize($midPath);
        imagecopymerge($imgMid, $dituImg, 0, 0, 0, 0, $dituWidth, $dituHight, 100);
        imagecopymerge($imgMid, $img, $offset_x, $offset_y, 0, 0, $width, $hight , 100);
        imagepng($imgMid,'uploads/qrcode/qrcodeRes'.$mid.'.png');
        imagedestroy($img);
        imagedestroy($dituImg);
        imagedestroy($imgMid);
        return true;
    }

    public static function formatResponse($status,$info,$data = [],$str = 'default'){
        $res = [
            'status' => $status,
            'info' => $info,
        ];
        if ($str != 'default'){
            $res[$str] = $data;
        }
        return Response::json($res);
    }

}
