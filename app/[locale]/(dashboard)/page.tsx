import Image from "next/image";
import React from "react";

const MainPage = async () => {
  // const supabase = await createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  return (
    <section className="min-h-screen mx-auto">
      {/* <h1>{t("products:heading")}</h1> */}
      <Image src={"/assets/logo2.png"} alt="logo" width={70} height={80} />
    </section>
  );
};

export default MainPage;
