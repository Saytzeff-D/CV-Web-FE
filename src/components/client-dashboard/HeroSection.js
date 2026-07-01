import {
  CalendarTodayOutlined,
  FavoriteBorder,
  AccountBalanceWalletOutlined,
  AccessTime,
  Add,
  ChatBubbleOutline,
} from "@mui/icons-material";

import HeroImage from "../../assets/hero-image.png" // your image

const HeroSection = () => {
  const stats = [
    {
      title: "ACTIVE BOOKINGS",
      value: "18",
      change: "+12%",
      icon: <CalendarTodayOutlined />,
    },
    {
      title: "PENDING PAYMENTS",
      value: "03",
      change: "-2.4%",
      icon: <AccessTime />,
    },
    {
      title: "SAVED PROPERTIES",
      value: "42",
      change: "+5.2%",
      icon: <FavoriteBorder />,
    },
    {
      title: "WALLET BALANCE",
      value: "₦4.2M",
      change: "+8.1%",
      icon: <AccountBalanceWalletOutlined />,
    },
  ];

  return (
    <>
      {/* HERO */}

      <div
        className="rounded-5 overflow-hidden position-relative my-5"
        style={{
          height: 220,
          backgroundImage: `url(${HeroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}

        <div
          className="position-absolute top-0 start-0 w-100 h-100 mt-5"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,.65) 0%, rgba(0,0,0,.35) 45%, rgba(0,0,0,.15) 100%)",
          }}
        />

        {/* Content */}

        <div className="position-relative h-100 d-flex align-items-center px-md-5 px-4">
          <div className="text-white">

            <small
              className="rounded-pill px-3 py-2 d-inline-block mb-3"
              style={{
                background: "rgba(255,255,255,.12)",
                backdropFilter: "blur(10px)",
              }}
            >
              ✓ VERIFIED ACCOUNT
            </small>

            <h1 className="fw-bold mb-3">
              Welcome back, Alex! 👋
            </h1>

            <p
              className="mb-0 d-none d-md-block"
              style={{
                maxWidth: 520,
                opacity: .9,
              }}
            >
              You have 3 property verifications pending and 18 active bookings
              for this week. Your listings are performing 12% better than last
              month.
            </p>

          </div>
        </div>
      </div>

      {/* STATS */}

      <div className="row g-4">

        {stats.map((item) => (
          <div className="col-lg-3 col-md-6" key={item.title}>
            <div className="card border-0 shadow-sm rounded-4 h-100">

              <div className="card-body">

                <div className="d-flex justify-content-between align-items-start">

                  <div>

                    <small className="text-uppercase text-secondary fw-semibold">
                      {item.title}
                    </small>

                    <h2 className="fw-bold mt-2">
                      {item.value}
                    </h2>

                    <small className="text-muted">
                      <strong>{item.change}</strong> vs last month
                    </small>

                  </div>

                  <div
                    className="rounded-circle d-flex justify-content-center align-items-center"
                    style={{
                      width: 52,
                      height: 52,
                      background: "#f4f4f4",
                    }}
                  >
                    {item.icon}
                  </div>

                </div>

              </div>
            </div>
          </div>
        ))}

      </div>

      {/* ACTION BUTTONS */}

      <div className="d-flex flex-wrap gap-3 mt-4">

        <button className="btn btn-dark rounded-pill px-4 py-3 shadow-sm">

          <Add sx={{ fontSize: 18 }} />

          <span className="ms-2 fw-semibold">
            New Booking
          </span>

        </button>

        <button className="btn btn-outline-secondary rounded-pill px-4 py-3">

          <FavoriteBorder sx={{ fontSize: 18 }} />

          <span className="ms-2 fw-semibold">
            Save Listing
          </span>

        </button>

        <button className="btn btn-outline-secondary rounded-pill px-4 py-3">

          <ChatBubbleOutline sx={{ fontSize: 18 }} />

          <span className="ms-2 fw-semibold">
            Contact Support
          </span>

        </button>

      </div>
    </>
  );
};

export default HeroSection;