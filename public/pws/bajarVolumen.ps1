Add-Type -TypeDefinition @"
    using System;
    using System.Runtime.InteropServices;

    public class KeyboardInput
    {
        [DllImport("user32.dll")]
        public static extern void keybd_event(byte bVk, byte bScan, uint dwFlags, UIntPtr dwExtraInfo);

        public const int VK_VOLUME_DOWN = 0xAE;
        public const int KEYEVENTF_EXTENDEDKEY = 0x1;
        public const int KEYEVENTF_KEYUP = 0x2;

        public static void SendMediaVolumeDown()
        {
            keybd_event(VK_VOLUME_DOWN, 0, KEYEVENTF_EXTENDEDKEY, UIntPtr.Zero);
            keybd_event(VK_VOLUME_DOWN, 0, KEYEVENTF_KEYUP, UIntPtr.Zero);
        }
    }
"@

[KeyboardInput]::SendMediaVolumeDown()
